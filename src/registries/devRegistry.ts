import { JsonValue, ModuleInfo, ModuleTypes, VersionInfo } from '../types.js'
import { NotImplementedError } from '../helpers.js'
import { Registry, RegistryConfig } from './registry.js'
import fetch from 'node-fetch'

type DevManifest = {
    name: string
    branch: string
    version: string
    type: ModuleTypes
    title: string
    description: string
    main?: string
    dist?: string
    icon?: string
    metadata?: string
    contextIds?: string[]
    interfaces?: {
        [name: string]: string
    }
    dependencies?: {
        [name: string]: string
    }
    config?: {
        schema?: string
        default?: string
    }
    overlays?: {
        [name: string]: string
    }
}

type JsonReference = {
    $ref: string
}

type DevManifestRaw = DevManifest & {
    name: string | JsonReference
    version: string | JsonReference
    description: string | JsonReference
    metadata: string | JsonReference
    main: string | JsonReference
    dist: string | JsonReference
}

export class DevRegistry implements Registry {
    private _rootUrl: string
    public isAvailable = true
    public error: string = null
    public blockchain = 'develop'
    public url: string
    public isDev: boolean

    private _cachePromise: Promise<void> = null
    private _devConfig: DevManifestRaw | string[] = null
    private _manifestByUrl = new Map<string, DevManifest>()
    private _infoByUrl = new Map<string, { module: ModuleInfo; version: VersionInfo }>()

    readonly TIMEOUT = 3000 // 3 seconds

    constructor({ url, isDev }: RegistryConfig) {
        if (!url) throw new Error('Config Url is required')

        this.url = url
        this.isDev = isDev
        this._rootUrl = new URL(this.url).origin
    }

    public async getModuleInfo(
        contextIds: string[]
    ): Promise<{ [contextId: string]: ModuleInfo[] }> {
        await this._cacheDevConfig()
        const result = {}

        for (const contextId of contextIds) {
            result[contextId] = []

            const modules = this._fetchModulesByContextId([contextId])

            for (const moduleName of modules) {
                const info = Array.from(this._infoByUrl)
                    .map(([, info]) => info)
                    .find((info) => info.module.name === moduleName)
                result[contextId].push(info.module)
            }
        }

        return result
    }

    public async getModuleInfoByName(name: string): Promise<ModuleInfo> {
        await this._cacheDevConfig()
        const info = Array.from(this._infoByUrl)
            .map(([, v]) => v.module)
            .find((v) => v.name === name)
        return info
    }

    public async getVersionNumbers(name: string, branch: string): Promise<string[]> {
        await this._cacheDevConfig()
        const versions = Array.from(this._infoByUrl)
            .map(([, v]) => v)
            .filter((v) => v.module.name === name && v.version.branch === branch)
            .map((x) => x.version.version)
        return versions
    }

    public async getVersionInfo(
        name: string,
        branch: string,
        version: string
    ): Promise<VersionInfo> {
        await this._cacheDevConfig()
        const info = Array.from(this._infoByUrl)
            .map(([, v]) => v)
            .find(
                (v) =>
                    v.module.name === name &&
                    v.version.branch === branch &&
                    v.version.version === version
            )

        if (!info || !info.version) {
            // console.error(`The manifest of the module "${name}@${branch}#${version}" is not found`);
            return null
        }

        return info.version
    }

    // ToDo: merge it into getModuleInfo
    public async getAllDevModules(): Promise<{ module: ModuleInfo; versions: VersionInfo[] }[]> {
        await this._cacheDevConfig()
        const modules: { module: ModuleInfo; versions: VersionInfo[] }[] = []
        this._infoByUrl.forEach((info) =>
            modules.push({ module: info.module, versions: [info.version] })
        )
        return modules
    }

    private async _cacheDevConfig() {
        // protection of parallel running of __cacheDevConfig()
        if (!this._cachePromise)
            this._cachePromise = this.__cacheDevConfig().finally(() => (this._cachePromise = null))
        return this._cachePromise
    }

    private async __cacheDevConfig() {
        try {
            const response = await fetch(this.url)
            if (!response.ok) throw new Error(response.statusText)
            this._devConfig = (await response.json()) as string[]

            if (Array.isArray(this._devConfig)) {
                const manifests = (await Promise.all(
                    this._devConfig.map((url) => this._loadManifest(url).then((m) => [url, m]))
                )) as [string, DevManifest][]
                manifests.forEach(([url, m]) => this._manifestByUrl.set(url, m))
                const infos = (await Promise.all(
                    manifests.map(([url, m]) =>
                        this._loadModuleAndVersionInfo(url, m).then((info) => [url, info])
                    )
                )) as [string, { module: ModuleInfo; version: VersionInfo }][]
                infos.forEach(([url, m]) => this._infoByUrl.set(url, m))
            } else {
                const manifestResolved = await this._resolveJsonRefs(this._devConfig, this.url)
                this._manifestByUrl.set(this.url, manifestResolved)
                const info = await this._loadModuleAndVersionInfo(this.url, this._devConfig)
                this._infoByUrl.set(this.url, info)
            }

            this.isAvailable = true
            this.error = null
        } catch (err) {
            this.isAvailable = false
            this.error = err.message
            throw new Error(this.error)
        }
    }

    public async addModule(): Promise<any> {
        throw new NotImplementedError()
    }

    public async getOwnership(): Promise<string> {
        return null
    }

    public async transferOwnership(): Promise<void> {
        throw new NotImplementedError()
    }

    public async getContextIds(): Promise<string[]> {
        throw new NotImplementedError()
    }

    public async addContextId() {
        throw new NotImplementedError()
    }

    public async removeContextId() {
        throw new NotImplementedError()
    }
    public async getAdmins(): Promise<string[]> {
        throw new NotImplementedError()
    }

    public async addAdmin() {
        throw new NotImplementedError()
    }

    public async removeAdmin() {
        throw new NotImplementedError()
    }

    public async editModuleInfo(): Promise<void> {
        throw new NotImplementedError()
    }

    public async getModuleNftUrl(): Promise<string> {
        throw new NotImplementedError()
    }

    private async _loadModuleAndVersionInfo(
        manifestUri: string,
        dm: DevManifest
    ): Promise<{ module: ModuleInfo; version: VersionInfo }> {
        const mi = new ModuleInfo()
        mi.name = dm.name
        mi.title = dm.title
        mi.type = dm.type
        mi.description = dm.description
        mi.metadata = dm.metadata
            ? {
                  hash: null,
                  uris: [new URL(dm.metadata, new URL(manifestUri, this._rootUrl).href).href],
              }
            : null
        mi.icon = dm.icon
            ? {
                  hash: null,
                  uris: [new URL(dm.icon, new URL(manifestUri, this._rootUrl).href).href],
              }
            : null
        mi.interfaces = Object.keys(dm.interfaces || {})
        mi.contextIds = dm.contextIds ?? []
        mi.registryUrl = this.url
        mi.isUnderConstruction = false

        const vi = new VersionInfo()
        vi.registryUrl = this.url
        vi.name = dm.name
        vi.branch = dm.branch
        vi.version = dm.version
        vi.type = dm.type
        vi.main = dm.main
            ? {
                  hash: null,
                  uris: [new URL(dm.main, new URL(manifestUri, this._rootUrl).href).href],
              }
            : null
        vi.dist = dm.dist
            ? {
                  hash: null,
                  uris: [new URL(dm.dist, new URL(manifestUri, this._rootUrl).href).href],
              }
            : null
        vi.dependencies = dm.dependencies
        vi.interfaces = dm.interfaces
        vi.schemaConfig =
            dm.config && dm.config.schema
                ? {
                      hash: null,
                      uris: [
                          new URL(dm.config.schema, new URL(manifestUri, this._rootUrl).href).href,
                      ],
                  }
                : null
        vi.defaultConfig =
            dm.config && dm.config.default
                ? {
                      hash: null,
                      uris: [
                          new URL(dm.config.default, new URL(manifestUri, this._rootUrl).href).href,
                      ],
                  }
                : null
        vi.overlays = dm.overlays
            ? Object.fromEntries(
                  Object.entries(dm.overlays).map(([k, v]) => [k, { uris: [v], hash: null }])
              )
            : null

        return { module: mi, version: vi }
    }

    private async _loadManifest(uri: string): Promise<DevManifest> {
        const manifestUri = new URL(uri, this._rootUrl).href
        const response = await fetch(manifestUri)
        const manifestRaw = (await response.json()) as DevManifestRaw
        const manifestResolved = await this._resolveJsonRefs(manifestRaw, manifestUri)
        return manifestResolved
    }

    private async _resolveJsonRefs(
        manifest: DevManifestRaw,
        manifestUri: string
    ): Promise<DevManifest> {
        const cache = new Map<string, JsonValue>()

        for (const key of ['name', 'version', 'description', 'main', 'dist', 'metadata']) {
            if (typeof manifest[key] === 'object' && !!manifest[key]['$ref']) {
                const [jsonUrl, path] = manifest[key]['$ref'].split('#/')
                const jsonRefUri = new URL(jsonUrl, manifestUri).href

                if (!cache.has(jsonRefUri)) {
                    const response = await fetch(jsonRefUri)
                    const json = (await response.json()) as string[]
                    cache.set(jsonRefUri, json)
                }

                manifest[key] = cache.get(jsonRefUri)[path]
            }
        }

        return manifest
    }

    private _fetchModulesByContextId(contextIds: string[]): string[] {
        const result = []

        const areMatches = (a: string[], b: string[]): boolean => {
            for (const _a of a) {
                for (const _b of b) {
                    if (_a === _b) return true
                }
            }
            return false
        }

        for (const [, manifest] of Array.from(this._manifestByUrl)) {
            if (areMatches(manifest.contextIds || [], contextIds)) {
                result.push(manifest.name)
                result.push(...this._fetchModulesByContextId([manifest.name]))
                result.push(
                    ...this._fetchModulesByContextId(Object.keys(manifest.interfaces || {}))
                )
            }
        }

        return result
    }
}
