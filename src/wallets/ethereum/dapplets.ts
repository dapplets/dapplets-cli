import { Provider, TransactionRequest } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { IEthereumWallet } from './interface.js'

class EthereumWallet extends ethers.Signer implements IEthereumWallet {
    public provider: ethers.providers.StaticJsonRpcProvider
    private _wallet: ethers.Wallet = null
    private _lastUsage: string = null
    private _privateKey: string

    constructor(config: { providerUrl: string; chainId: number }) {
        super()
        this.provider = new ethers.providers.StaticJsonRpcProvider(
            config.providerUrl,
            config.chainId
        )
    }

    async getAddress(): Promise<string> {
        if (!this._wallet) return null
        return this._wallet.getAddress()
    }

    async signMessage(message: string | ethers.utils.Bytes): Promise<string> {
        if (!this._wallet) throw new Error('Wallet is not connected')
        return this._wallet.signMessage(message)
    }

    async signTransaction(transaction: TransactionRequest): Promise<string> {
        if (!this._wallet) throw new Error('Wallet is not connected')
        return this._wallet.signTransaction(transaction)
    }

    connect(provider: Provider): ethers.Signer {
        if (!this._wallet) throw new Error('Wallet is not connected')
        return this._wallet.connect(provider)
    }

    async sendTransaction(
        transaction: TransactionRequest
    ): Promise<ethers.providers.TransactionResponse> {
        if (!this._wallet) throw new Error('Wallet is not connected')
        this._lastUsage = new Date().toISOString()
        return this._wallet.sendTransaction(transaction)
    }

    async sendTransactionOutHash(transaction: TransactionRequest): Promise<string> {
        if (!this._wallet) throw new Error('Wallet is not connected')
        this._lastUsage = new Date().toISOString()
        const tx = await this._wallet.sendTransaction(transaction)
        return tx.hash
    }

    async sendCustomRequest(method: string, params: any[]): Promise<any> {
        if (method === 'eth_sendTransaction') {
            return this.sendTransactionOutHash(params[0] as any)
        } else if (method === 'eth_accounts') {
            const address = await this.getAddress()
            return [address]
        } else {
            if (!this._wallet) throw new Error('Wallet is not connected')
            return this.provider.send(method, params)
        }
    }

    async isAvailable() {
        return true
    }

    async isConnected() {
        return !!this._privateKey
    }

    async connectWallet(privateKey: string): Promise<void> {
        await this._initWallet(privateKey)
        this._lastUsage = new Date().toISOString()
        this._wallet = new ethers.Wallet(privateKey, this.provider)
    }

    async disconnectWallet() {
        this._wallet = null
        this._privateKey = null
        this._lastUsage = null
    }

    async getMeta() {
        return {
            name: 'Built-in Wallet',
            description: 'Dapplets Browser Extension',
            icon: '',
        }
    }

    async getLastUsage() {
        return this._lastUsage
    }

    private _initWallet = async (privateKey: string) => {
        if (!this._wallet) {
            if (Object.values(privateKey).length) {
                this._wallet = new ethers.Wallet(privateKey, this.provider)
            }
            this._privateKey = privateKey
        }
    }
}

export default EthereumWallet
