export type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | { [key: string]: JsonValue }

export enum UriTypes {
    Unknown = 0,
    Http,
    // Swarm,
    Ipfs,
    Ethereum,
    Ens,
    // Near,
}

export type StorageRef = {
    hash: string
    uris: string[]
}

export enum Environments {
    Dev = 'dev',
    Test = 'test',
    Main = 'main',
}

export enum DefaultSigners {
    EXTENSION = 'extension',
}

export enum ChainTypes {
    ETHEREUM_GOERLI = 'ethereum/goerli',
    // ETHEREUM_XDAI = 'ethereum/xdai',
    // NEAR_TESTNET = 'near/testnet',
    // NEAR_MAINNET = 'near/mainnet',
}

export enum WalletTypes {
    WALLETCONNECT = 'walletconnect',
    METAMASK = 'metamask',
    NEAR = 'near',
    DAPPLETS = 'dapplets',
}

export type WalletInfo = {
    compatible: boolean
    protocolVersion: string
    engineVersion: string
    device: {
        manufacturer: string
        model: string
    }
}

export enum StorageTypes {
    // Swarm = 'swarm',
    Ipfs = 'ipfs',
}

export enum ModuleTypes {
    Feature = 'FEATURE',
    Adapter = 'ADAPTER',
    Library = 'LIBRARY',
    Interface = 'INTERFACE',
    ParserConfig = 'CONFIG',
}

export const DEFAULT_BRANCH_NAME = 'default'

abstract class Base {
    abstract getId: () => string
}

export class ModuleInfo extends Base {
    getId = () => this.registryUrl + ':' + this.name

    registryUrl: string = null
    name: string = null
    type: ModuleTypes = null
    title: string = null
    description: string = null
    author: string = null
    image?: StorageRef = null
    metadata?: StorageRef = null
    icon?: StorageRef = null
    interfaces: string[] = []
    contextIds: string[] = []
    isUnderConstruction: boolean = null
}

export class VersionInfo extends Base {
    getId = () => this.registryUrl + ':' + this.name + '#' + this.branch + '@' + this.version

    registryUrl: string = null
    type: ModuleTypes = null

    name: string = null
    branch: string = null
    version: string = null
    main: StorageRef = null
    dist: StorageRef = null
    dependencies: {
        [name: string]: string
    } = null
    interfaces: {
        [name: string]: string
    } = null
    environment?: Environments = null
    schemaConfig: StorageRef = null
    defaultConfig: StorageRef = null
    overlays: {
        [name: string]: StorageRef
    } = null
    extensionVersion?: string = null
    createdAt?: string = null
    actions?: string = null
}

export type EthereumNetwrokConfig = {
    networkId: string
    chainId: number
    nodeUrl: string
    explorerUrl?: string
}

export type DappletRuntimeResult = {
    isActionHandler: boolean
    isHomeHandler: boolean
}
