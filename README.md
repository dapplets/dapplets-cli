# Dapplets CLI

Toolkit for deploying dapplet modules in registries.

## Installation

### Install Globally

```bash
npm install -g @dapplets/cli
```

### Install Locally

```bash
npm install --save-dev @dapplets/cli
```

## Usage

```bash
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
  deploy [options] [module-name]  Deploy module: FEATURE, CONFIG, and INTERFACE.
  help [command]                  display help for command
```

```bash
Usage: dapplets deploy [options] [module-name]

Deploy module: FEATURE, CONFIG, and INTERFACE.

Arguments:
  module-name                 Module name to deploy

Options:
  -d, --dev-server-url <url>  Developer server URL (env: DEV_SERVER_URL)
  -n, --module-name [name]    The name of the module to be deployed (env: MODULE_NAME)
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
| `-n, --module-name [name]`     | `MODULE_NAME`        |

Example of Windows command line:

```bash
$ set ETH_PRIVATE_KEY=0x0000000000000000000000000000000000000000000000000000000000000000 && set TARGET_REGISTRY=test.v3.registry.dapplet-base.eth && set IPFS_GATEWAY_URL=https://ipfs-gateway.mooo.com && set DEV_SERVER_URL=https://localhost:3000/dapplet.json && dapplets deploy test-dapplet --ipfs
```

When the variables have already been set:

```bash
$ dapplets deploy <MODULE_NAME> --ipfs
```

If you prefer to set MODULE_NAME environment variable:

```bash
$ dapplets deploy -I
```

## CI/CD

You can use [concurrently](https://www.npmjs.com/package/concurrently) or similar tool to run the module and deploy it with a single npm script in the `package.json`:

```json
"scripts": {
    "cd": "concurrently -c \"yellow,green\" -n \"dapplet,cli\" \"npm start\" \"npx @dapplets/cli@latest deploy -I\" -ks \"command-cli\""
  },
```

Use it in your CI/CD. The examples of GitHub Actions workflows:

-   for one dapplet: https://github.com/dapplets/tipping-dapplet/blob/develop/.github/workflows/cd.yml
-   for monorepo use a reusable workflow: https://github.com/dapplets/modules-monorepo/blob/develop/.github/workflows/cd.yml
