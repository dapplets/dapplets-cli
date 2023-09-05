import { UriTypes } from './types.js'

export const joinUrls = (base: string, url: string) => {
    return new URL(url, base).href
}

export function timeoutPromise<T>(ms: number, promise: Promise<T>, timeoutCallback?: Function) {
    return new Promise<T>((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            timeoutCallback?.()
            reject(new Error('promise timeout'))
        }, ms)
        promise.then(
            (res) => {
                clearTimeout(timeoutId)
                resolve(res)
            },
            (err) => {
                clearTimeout(timeoutId)
                reject(err)
            }
        )
    })
}

/**
 * Recognizes a type of URI
 */
export function typeOfUri(uri: string): UriTypes {
    const uriLower = uri.toLowerCase()
    // todo: added reg exp for validation hexadecimal adresses near
    const regExp16thNearAddress = new RegExp(/^[a-zA-Z0-9\s]{16,128}$/)

    if (uriLower.indexOf('http://') === 0 || uriLower.indexOf('https://') === 0) {
        return UriTypes.Http
    }

    // if (uriLower.indexOf('bzz://') === 0) {
    //     return UriTypes.Swarm
    // }

    if (uriLower.indexOf('ipfs://') === 0) {
        return UriTypes.Ipfs
    }

    // ToDo: add Ethereum address validator
    if (uriLower.indexOf('0x') === 0 && uriLower.length === 42) {
        return UriTypes.Ethereum
    }

    if (uriLower.lastIndexOf('.eth') === uriLower.length - 4) {
        return UriTypes.Ens
    }

    // if (
    //     uriLower.lastIndexOf('.near') === uriLower.length - 5 ||
    //     uriLower.lastIndexOf('.testnet') === uriLower.length - 8 ||
    //     uriLower.indexOf('dev-') === 0 ||
    //     uriLower.match(regExp16thNearAddress)
    // ) {
    //     return UriTypes.Near
    // }

    return UriTypes.Unknown
}

export function convertTimestampToISODate(timestamp: number): string {
    return new Date(timestamp).toISOString()
}

export function convertISODateToTimestamp(isoDate: string): number {
    return new Date(isoDate).getTime() / 1000
}

/**
 * Returns bit value of hex string by bit number
 * @param hex hex string (0xdeadbeef) of any length
 * @param bitnumber index number of bit from the end (starts from 0)
 */
export function getBitFromHex(hex: string, bitnumber: number): boolean {
    return convertHexToBinary(hex).split('').reverse()[bitnumber] === '1'
}

/**
 * Converts hex-string to binary-string. Big numbers resistance.
 */
export function convertHexToBinary(hex: string): string {
    hex = hex.replace('0x', '').toLowerCase()
    let out = '' // ToDo: out is unused?
    for (const c of hex) {
        switch (c) {
            case '0':
                out += '0000'
                break
            case '1':
                out += '0001'
                break
            case '2':
                out += '0010'
                break
            case '3':
                out += '0011'
                break
            case '4':
                out += '0100'
                break
            case '5':
                out += '0101'
                break
            case '6':
                out += '0110'
                break
            case '7':
                out += '0111'
                break
            case '8':
                out += '1000'
                break
            case '9':
                out += '1001'
                break
            case 'a':
                out += '1010'
                break
            case 'b':
                out += '1011'
                break
            case 'c':
                out += '1100'
                break
            case 'd':
                out += '1101'
                break
            case 'e':
                out += '1110'
                break
            case 'f':
                out += '1111'
                break
            default:
                return ''
        }
    }
    return hex
}

/**
 * Merges and deduplicates arrays of arrays
 * @param input arrays of arrays
 */
export function mergeDedupe<T>(input: T[][]): T[] {
    return [...new Set(mergeArrays(input))]
}

/**
 * Merges arrays of arrays
 * @param input arrays of arrays
 */
export function mergeArrays<T>(input: T[][]): T[] {
    return [].concat(...input)
}

export function networkName(chainId: number) {
    const map = {
        1: 'mainnet',
        3: 'ropsten',
        4: 'rinkeby',
        5: 'goerli',
        42: 'kovan',
        100: 'xdai',
    }

    return map[chainId] ?? 'unknown'
}

export class NotImplementedError extends Error {
    constructor() {
        super('The method or operation is not implemented.')
    }
}
