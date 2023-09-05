import { WalletTypes } from '../../types.js'
import dapplets from './dapplets.js'
// import metamask from './metamask.js'
// import walletconnect from './walletconnect'

export default {
    // [WalletTypes.METAMASK]: metamask,
    [WalletTypes.DAPPLETS]: dapplets,
    // ToDo: migrate to WalletConnect v2
    // [WalletTypes.WALLETCONNECT]: walletconnect,
}
