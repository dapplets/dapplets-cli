import { providers, Signer, ethers } from 'ethers'
import { gte } from 'semver'
import JSZip from 'jszip'
import { joinUrls, typeOfUri, NotImplementedError } from './helpers.js'
import { ModuleInfo, ModuleTypes, StorageTypes, VersionInfo, UriTypes } from './types.js'
import { Registry } from './registries/registry.js'
import { DevRegistry } from './registries/devRegistry.js'
import { EthRegistry } from './registries/ethRegistry.js'
import StorageAggregator from './moduleStorages/moduleStorage.js'

let storageAggregator: StorageAggregator

type TDeployedModuleInfo = {
    scriptUrl?: string
    txHash: string
    sender: string
    version: string
}

const deployModule = async (
    moduleName: string,
    ethPrivateKey: string,
    devServerUrl: string,
    targetRegistryUrl: string,
    ipfsGatewayUrl: string,
    ipfs: boolean,
    moduleBranch: string
): Promise<TDeployedModuleInfo> => {
    storageAggregator = new StorageAggregator(ipfsGatewayUrl)
    const targetStorages: StorageTypes[] = []
    if (ipfs) targetStorages.push(StorageTypes.Ipfs)
    // ToDo: Add Swarm
    try {
        const devRegistry = await instantiateRegistry(
            { url: devServerUrl, isDev: true, isEnabled: true },
            ethPrivateKey
        )
        let mi: ModuleInfo = null
        let attemptsNumber = 10
        while (attemptsNumber) {
            try {
                mi = await devRegistry.getModuleInfoByName(moduleName)
                break
            } catch (err) {
                if (--attemptsNumber) {
                    console.log(
                        'The development server is not running. Attempts left: ' + attemptsNumber
                    )
                    await new Promise<void>((res) => setTimeout(() => res(), 3000))
                } else {
                    throw err
                }
            }
        }
        if (!mi) {
            throw new Error(
                'The selected developer server does not have a module with that name. Check if the developer server has started and if its name is correct.'
            )
        }
        const versionNumbers = await devRegistry.getVersionNumbers(moduleName, moduleBranch)
        const vi = await devRegistry.getVersionInfo(moduleName, moduleBranch, versionNumbers[0])

        const targetRegistry = await instantiateRegistry(
            { url: targetRegistryUrl, isDev: false, isEnabled: true },
            ethPrivateKey
        )
        const miFromTargetRegistry = await targetRegistry.getModuleInfoByName(moduleName)
        if (!miFromTargetRegistry) {
            throw new Error(
                'The very first module deploy should be through the Dapplets Extension to create the NFT.'
            )
        }
        const versionNumbersFromTargetRegistry = await targetRegistry.getVersionNumbers(
            moduleName,
            moduleBranch
        )
        if (gte(versionNumbersFromTargetRegistry[0], versionNumbers[0])) {
            throw new Error(
                'The module version must be higher than the one that exists in the target registry.'
            )
        }
        const scriptUrl = await uploadModule(mi, vi, targetStorages)
        const tx = await targetRegistry.addModule(mi, vi)
        return { scriptUrl, txHash: tx.hash, sender: tx.from, version: vi.version }
    } catch (err) {
        console.error(err)
        throw err
    }
}

const instantiateRegistry = async (
    registryConfig: {
        isEnabled: boolean
        url: string
        isDev: boolean
    },
    ethPrivateKey: string
): Promise<Registry | null> => {
    const uriType = typeOfUri(registryConfig.url)
    if (uriType === UriTypes.Http && registryConfig.isDev) {
        return new DevRegistry({ url: registryConfig.url, isDev: registryConfig.isDev })
    } else if (uriType === UriTypes.Ethereum || uriType === UriTypes.Ens) {
        const ethSigner = await getEthSigner(ethPrivateKey)
        return new EthRegistry({
            url: registryConfig.url,
            isDev: registryConfig.isDev,
            signer: ethSigner,
        })
    } else {
        return null
    }
}

const getEthSigner = async (ethPrivateKey: string): Promise<Signer> => {
    const providerUrl = 'https://goerli.mooo.com/'
    const chainId = 5
    const signer = new (class extends Signer {
        provider: providers.StaticJsonRpcProvider
        wallet: ethers.Wallet

        constructor() {
            super()
            this.provider = new providers.StaticJsonRpcProvider(providerUrl, chainId)
            this.wallet = new ethers.Wallet(ethPrivateKey, this.provider)
        }

        async getAddress(): Promise<string> {
            return this.wallet.address
        }

        async signMessage(): Promise<string> {
            throw new NotImplementedError()
        }

        async signTransaction(): Promise<string> {
            throw new NotImplementedError()
        }

        async sendTransaction(
            transaction: providers.TransactionRequest
        ): Promise<providers.TransactionResponse> {
            return this.wallet.sendTransaction(transaction)
        }

        connect(): Signer {
            throw new NotImplementedError()
        }
    })()

    return signer
}

const uploadModule = async (
    mi: ModuleInfo,
    vi: VersionInfo | null,
    targetStorages: StorageTypes[]
): Promise<string> => {
    try {
        // ToDo: check everything before publishing

        if (!mi.name) throw new Error('Module name is required.')
        if (!/^[a-z0-9][a-z0-9-.]*[a-z0-9]$/gm.test(mi.name))
            throw new Error('Invalid module name.')
        if (
            mi.icon &&
            mi.icon.uris.length > 0 &&
            !(
                mi.icon.uris[0].endsWith('.png') ||
                mi.icon.uris[0].startsWith('data:image/png;base64')
            )
        )
            throw new Error('Type of module icon must be PNG.')

        let scriptUrl = null

        const zip = new JSZip()

        if (vi && vi.main) {
            const arr = await storageAggregator.getResource(vi.main)
            if (vi.type === ModuleTypes.ParserConfig) {
                zip.file('index.json', arr)
                const config = new TextDecoder('utf-8').decode(new Uint8Array(arr))
                const addStylesToZip = async (confiWithStyles: any, keyToReplace: string) =>
                    Promise.all(
                        Object.entries(confiWithStyles).map(async ([key, value]: [string, any]) => {
                            if (typeof value === 'string' && key === keyToReplace) {
                                const cssArr = await storageAggregator.getResource({
                                    uris: [joinUrls(vi.main.uris[0], value)],
                                    hash: null,
                                })
                                if (cssArr) zip.file(value, cssArr)
                            } else if (typeof value === 'object') {
                                await addStylesToZip(value, keyToReplace)
                            }
                        })
                    )

                await addStylesToZip(JSON.parse(config), 'styles')
            } else {
                zip.file('index.js', arr)
            }
        }

        if (vi && vi.defaultConfig && vi.type !== ModuleTypes.ParserConfig) {
            const arr = await storageAggregator.getResource(vi.defaultConfig)
            zip.file('default.json', arr)
        }

        if (vi && vi.schemaConfig && vi.type !== ModuleTypes.ParserConfig) {
            const arr = await storageAggregator.getResource(vi.schemaConfig)
            zip.file('schema.json', arr)
        }

        // upload overlays declared in manifest
        // it packs all files from `assets-manifest.json` into tar container
        if (vi && vi.overlays) {
            for (const overlayName in vi.overlays) {
                const baseUrl = vi.overlays[overlayName].uris[0]
                const assetManifestUrl = new URL('assets-manifest.json', baseUrl).href
                const arr = await storageAggregator
                    .getResource({ uris: [assetManifestUrl], hash: null })
                    .catch(() => {
                        throw new Error(
                            `Cannot find the assets manifest by the URL: ${assetManifestUrl}` +
                                'Check file availability. Perhaps the problem is in the self-signed SSL certificate. ' +
                                'Some browsers require you to add the certificate to the trusted ones using the built-in OS tools.'
                        )
                    })
                const json = String.fromCharCode.apply(null, new Uint8Array(arr))

                let assetManifest: any = null
                try {
                    assetManifest = JSON.parse(json)
                } catch (_) {
                    throw new Error(
                        'The assets manifest has invalid JSON.\nRequested URL: ' + assetManifestUrl
                    )
                }

                if (
                    !(
                        typeof assetManifest === 'object' &&
                        !Array.isArray(assetManifest) &&
                        assetManifest !== null
                    )
                ) {
                    throw new Error(
                        'The assets manifest must be a valid JSON object.\n' +
                            'Example: {"index.html": "index.html", "styles.css": "css-62d9da.css"}\n' +
                            'Requested URL: ' +
                            assetManifestUrl
                    )
                }

                const assets = Object.values(assetManifest)
                if (assets.indexOf('index.html') === -1) {
                    throw new Error(
                        'An assets manifest must contain a path to the `index.html` file.\n' +
                            'Example: {"index.html": "index.html", "styles.css": "css-62d9da.css"}\n' +
                            'Requested URL: ' +
                            assetManifestUrl
                    )
                }

                const files = await Promise.all(
                    assets.map((x: string) =>
                        storageAggregator
                            .getResource({ uris: [new URL(x, baseUrl).href], hash: null })
                            .then((y) => ({ url: x, arr: y }))
                    )
                )

                const hashUris = await storageAggregator.saveDir(files, targetStorages)
                vi.overlays[overlayName] = hashUris
            }

            // Add manifest to zip (just for overlays yet)
            const manifest = { overlays: vi.overlays }
            const manifestJson = JSON.stringify(manifest)
            const manifestArr = new TextEncoder().encode(manifestJson)
            zip.file('dapplet.json', manifestArr)
        }

        if (vi && vi.main) {
            // Dist file publishing
            const buf = await zip.generateAsync({
                type: 'uint8array',
                compression: 'DEFLATE',
                compressionOptions: { level: 9 },
            })
            const blob = new Blob([buf], { type: 'application/zip' })
            const hashUris = await storageAggregator.save(blob, targetStorages)

            // Manifest editing
            vi.dist = hashUris
            scriptUrl = hashUris.uris[0] // ToDo: remove it?
        }

        // ToDo: can't create NFT !!!
        // Upload icon and NFT image
        // await this._uploadModuleInfoIcons(mi, targetStorages)

        if (mi.metadata && mi.metadata.uris.length > 0) {
            // Detailed description publishing
            const buf = await storageAggregator.getResource(mi.metadata)
            const blob = new Blob([buf], { type: 'image/png' })
            const hashUris = await storageAggregator.save(blob, targetStorages)

            // Manifest editing
            mi.metadata = hashUris
        }

        // ToDo: Do we need to set it?
        // Use a current version of the extension as target value
        // if (vi && EXTENSION_VERSION) {
        //     vi.extensionVersion = EXTENSION_VERSION
        // }

        return scriptUrl
    } catch (err) {
        console.error(err)
        throw err
    }
}

export default deployModule
