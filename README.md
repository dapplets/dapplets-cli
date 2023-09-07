# Dapplets CLI

The tooling for deployment of dapplet modules to registries.

## Installation

### Install Globally

```
npm install -g @dapplets/cli
```

### Install Locally

```
npm install --save-dev @dapplets/cli
```

## Usage

```
Usage: dapplets [options] [command]

Dapplets CLI utility.

Options:
  -V, --version                   output the version number
  -k, --eth-private-key <key>     Ethereum private key (env: ETH_PRIVATE_KEY)
  -r, --target-registry <url>     Target registry (env: TARGET_REGISTRY)
  -i, --ipfs-gateway-url <url>    Ipfs gateway URL (env: IPFS_GATEWAY_URL)
  -I, --ipfs                      save module to IPFS
  -b, --module-branch             Module branch to deploy
  -h, --help                      display help for command

Commands:
  deploy [options] <module-name>  Deploy module: FEATURE, CONFIG, and INTERFACE.
  help [command]                  display help for command
```

```
Usage: dapplets deploy [options] <module-name>

Deploy module: FEATURE, CONFIG, and INTERFACE.

Arguments:
  module-name                 Module name to deploy

Options:
  -d, --dev-server-url <url>  Developer server URL (env: DEV_SERVER_URL)
  -h, --help                  display help for command
```

## Examples

Run `module` (`dapplet`, `adapter` or `virtual adapter`) from a project root directory containing a manifest.json file.

The following global parameters can be filled using environment variables:

| Parameter                      | Environment Variable |
| ------------------------------ | -------------------- |
| `-k, --eth-private-key <key>`  | `ETH_PRIVATE_KEY`    |
| `-r, --target-registry <url>`  | `TARGET_REGISTRY`    |
| `-i, --ipfs-gateway-url <url>` | `IPFS_GATEWAY_URL`   |
| `-d, --dev-server-url <url>`   | `DEV_SERVER_URL`     |

Example of Windows command line:

```
$ set ETH_PRIVATE_KEY=0x0000000000000000000000000000000000000000000000000000000000000000 && set TARGET_REGISTRY=test.v3.registry.dapplet-base.eth && set IPFS_GATEWAY_URL=https://ipfs-gateway.mooo.com && set DEV_SERVER_URL=https://localhost:3000/dapplet.json && dapplets deploy test-dapplet --ipfs
```

### Deploy package to registry

```
$ dapplets deploy <MODULE_NAME> --ipfs
```
