#!/usr/bin/env node

import { Command, Option } from 'commander'
import 'dotenv/config'
import pkg from '../package.json' assert { type: 'json' }
import { deployModule } from '../lib/index.js'

const program = new Command()

program
    .name('dapplets')
    .description(pkg.description)
    .version(pkg.version)
    .addOption(
        new Option('-k, --eth-private-key <type>', 'Ethereum private key').env('ETH_PRIVATE_KEY')
    )
    .addOption(new Option('-r, --target-registry <type>', 'Target registry').env('TARGET_REGISTRY'))
    .addOption(
        new Option('-i, --ipfs-gateway-url <type>', 'Ipfs gateway URL').env('IPFS_GATEWAY_URL')
    )
    .option('-I, --ipfs', 'save module to IPFS')
    .option('-b, --module-branch', 'Module branch to deploy', 'default')

program
    .command('deploy')
    .description('Deploy module: FEATURE, CONFIG, and INTERFACE.')
    .addOption(
        new Option('-d, --dev-server-url <type>', 'Developer server URL').env('DEV_SERVER_URL')
    )
    .argument('<module-name>', 'Module name to deploy')
    .action(async (moduleName, options) => {
        const { ethPrivateKey, targetRegistry, ipfsGatewayUrl, ipfs, moduleBranch } = program.opts()
        const { devServerUrl } = options
        if (!ethPrivateKey) return console.error('Ethereum private key must be specified!') // ToDo: check!
        if (!devServerUrl) return console.error('Developer server URL must be specified!')
        if (!targetRegistry) return console.error('Target registry must be specified!')
        const deployedModuleInfo = await deployModule(
            moduleName,
            ethPrivateKey,
            devServerUrl,
            targetRegistry,
            ipfsGatewayUrl,
            ipfs,
            moduleBranch
        )
        console.log()
        console.log('Module "' + moduleName + '" published successfully!')
        console.log('Current version:', deployedModuleInfo.version)
        console.log('Registry:', targetRegistry)
        console.log('Publisher:', deployedModuleInfo.sender)
        console.log(
            'Transaction on Etherscan: https://goerli.etherscan.io/tx/' + deployedModuleInfo.txHash
        ) // ToDo: here is a hardcode for Ethereum testnet registry type
        if (deployedModuleInfo.scriptUrl) console.log('Script URL:', deployedModuleInfo.scriptUrl)
    })

program.parse(process.argv)
