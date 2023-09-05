export default [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_dappletNFTContractAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'moduleName',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'admin',
        type: 'address',
      },
    ],
    name: 'addAdmin',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'moduleName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'contextId',
        type: 'string',
      },
    ],
    name: 'addContextId',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string[]',
        name: 'contextIds',
        type: 'string[]',
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'prev',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'next',
            type: 'string',
          },
        ],
        internalType: 'struct LinkString[]',
        name: 'links',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'uint8',
            name: 'moduleType',
            type: 'uint8',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'image',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'manifest',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'icon',
            type: 'tuple',
          },
          {
            internalType: 'string[]',
            name: 'interfaces',
            type: 'string[]',
          },
          {
            internalType: 'uint256',
            name: 'flags',
            type: 'uint256',
          },
        ],
        internalType: 'struct ModuleInfo',
        name: 'mInfo',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'branch',
            type: 'string',
          },
          {
            internalType: 'bytes4',
            name: 'version',
            type: 'bytes4',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'binary',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'branch',
                type: 'string',
              },
              {
                internalType: 'bytes4',
                name: 'version',
                type: 'bytes4',
              },
            ],
            internalType: 'struct DependencyDto[]',
            name: 'dependencies',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'branch',
                type: 'string',
              },
              {
                internalType: 'bytes4',
                name: 'version',
                type: 'bytes4',
              },
            ],
            internalType: 'struct DependencyDto[]',
            name: 'interfaces',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256',
            name: 'flags',
            type: 'uint256',
          },
          {
            internalType: 'bytes4',
            name: 'extensionVersion',
            type: 'bytes4',
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256',
          },
        ],
        internalType: 'struct VersionInfoDto',
        name: 'vInfo',
        type: 'tuple',
      },
    ],
    name: 'addModuleInfo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'moduleName',
        type: 'string',
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'branch',
            type: 'string',
          },
          {
            internalType: 'bytes4',
            name: 'version',
            type: 'bytes4',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'binary',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'branch',
                type: 'string',
              },
              {
                internalType: 'bytes4',
                name: 'version',
                type: 'bytes4',
              },
            ],
            internalType: 'struct DependencyDto[]',
            name: 'dependencies',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'branch',
                type: 'string',
              },
              {
                internalType: 'bytes4',
                name: 'version',
                type: 'bytes4',
              },
            ],
            internalType: 'struct DependencyDto[]',
            name: 'interfaces',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256',
            name: 'flags',
            type: 'uint256',
          },
          {
            internalType: 'bytes4',
            name: 'extensionVersion',
            type: 'bytes4',
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256',
          },
        ],
        internalType: 'struct VersionInfoDto',
        name: 'vInfo',
        type: 'tuple',
      },
    ],
    name: 'addModuleVersion',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'prev',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'next',
            type: 'string',
          },
        ],
        internalType: 'struct LinkString[]',
        name: 'links',
        type: 'tuple[]',
      },
    ],
    name: 'changeMyListing',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'lister',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'moduleName',
        type: 'string',
      },
    ],
    name: 'containsModuleInListing',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'hash',
            type: 'bytes32',
          },
          {
            internalType: 'string[]',
            name: 'uris',
            type: 'string[]',
          },
        ],
        internalType: 'struct StorageRef',
        name: 'image',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'hash',
            type: 'bytes32',
          },
          {
            internalType: 'string[]',
            name: 'uris',
            type: 'string[]',
          },
        ],
        internalType: 'struct StorageRef',
        name: 'manifest',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'hash',
            type: 'bytes32',
          },
          {
            internalType: 'string[]',
            name: 'uris',
            type: 'string[]',
          },
        ],
        internalType: 'struct StorageRef',
        name: 'icon',
        type: 'tuple',
      },
    ],
    name: 'editModuleInfo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'moduleName',
        type: 'string',
      },
    ],
    name: 'getAdminsByModule',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    name: 'getBranchesByModule',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'moduleName',
        type: 'string',
      },
    ],
    name: 'getContextIdsByModule',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'offset',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'limit',
        type: 'uint256',
      },
    ],
    name: 'getListers',
    outputs: [
      {
        internalType: 'address[]',
        name: 'listers',
        type: 'address[]',
      },
      {
        internalType: 'uint256',
        name: 'total',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'moduleName',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'offset',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'limit',
        type: 'uint256',
      },
    ],
    name: 'getListersByModule',
    outputs: [
      {
        internalType: 'address[]',
        name: 'out',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'getModuleByIndex',
    outputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'moduleType',
            type: 'uint8',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'image',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'manifest',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'icon',
            type: 'tuple',
          },
          {
            internalType: 'string[]',
            name: 'interfaces',
            type: 'string[]',
          },
          {
            internalType: 'uint256',
            name: 'flags',
            type: 'uint256',
          },
        ],
        internalType: 'struct ModuleInfo',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'moduleName',
        type: 'string',
      },
    ],
    name: 'getModuleIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: 'moduleIdx',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'moduleName',
        type: 'string',
      },
    ],
    name: 'getModuleInfoByName',
    outputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'moduleType',
            type: 'uint8',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'image',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'manifest',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'icon',
            type: 'tuple',
          },
          {
            internalType: 'string[]',
            name: 'interfaces',
            type: 'string[]',
          },
          {
            internalType: 'uint256',
            name: 'flags',
            type: 'uint256',
          },
        ],
        internalType: 'struct ModuleInfo',
        name: 'modules',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'branch',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'offset',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'limit',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'reverse',
        type: 'bool',
      },
    ],
    name: 'getModules',
    outputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'moduleType',
            type: 'uint8',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'image',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'manifest',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'icon',
            type: 'tuple',
          },
          {
            internalType: 'string[]',
            name: 'interfaces',
            type: 'string[]',
          },
          {
            internalType: 'uint256',
            name: 'flags',
            type: 'uint256',
          },
        ],
        internalType: 'struct ModuleInfo[]',
        name: 'modules',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'branch',
            type: 'string',
          },
          {
            internalType: 'bytes4',
            name: 'version',
            type: 'bytes4',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'binary',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'branch',
                type: 'string',
              },
              {
                internalType: 'bytes4',
                name: 'version',
                type: 'bytes4',
              },
            ],
            internalType: 'struct DependencyDto[]',
            name: 'dependencies',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'branch',
                type: 'string',
              },
              {
                internalType: 'bytes4',
                name: 'version',
                type: 'bytes4',
              },
            ],
            internalType: 'struct DependencyDto[]',
            name: 'interfaces',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256',
            name: 'flags',
            type: 'uint256',
          },
          {
            internalType: 'bytes4',
            name: 'extensionVersion',
            type: 'bytes4',
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256',
          },
        ],
        internalType: 'struct VersionInfoDto[]',
        name: 'lastVersions',
        type: 'tuple[]',
      },
      {
        internalType: 'address[]',
        name: 'owners',
        type: 'address[]',
      },
      {
        internalType: 'uint256',
        name: 'total',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'branch',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'offset',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'limit',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'reverse',
        type: 'bool',
      },
    ],
    name: 'getModulesByOwner',
    outputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'moduleType',
            type: 'uint8',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'image',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'manifest',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'icon',
            type: 'tuple',
          },
          {
            internalType: 'string[]',
            name: 'interfaces',
            type: 'string[]',
          },
          {
            internalType: 'uint256',
            name: 'flags',
            type: 'uint256',
          },
        ],
        internalType: 'struct ModuleInfo[]',
        name: 'modules',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'branch',
            type: 'string',
          },
          {
            internalType: 'bytes4',
            name: 'version',
            type: 'bytes4',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'binary',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'branch',
                type: 'string',
              },
              {
                internalType: 'bytes4',
                name: 'version',
                type: 'bytes4',
              },
            ],
            internalType: 'struct DependencyDto[]',
            name: 'dependencies',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'branch',
                type: 'string',
              },
              {
                internalType: 'bytes4',
                name: 'version',
                type: 'bytes4',
              },
            ],
            internalType: 'struct DependencyDto[]',
            name: 'interfaces',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256',
            name: 'flags',
            type: 'uint256',
          },
          {
            internalType: 'bytes4',
            name: 'extensionVersion',
            type: 'bytes4',
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256',
          },
        ],
        internalType: 'struct VersionInfoDto[]',
        name: 'lastVersions',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256',
        name: 'total',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string[]',
        name: 'ctxIds',
        type: 'string[]',
      },
      {
        internalType: 'address[]',
        name: 'listers',
        type: 'address[]',
      },
      {
        internalType: 'uint256',
        name: 'maxBufLen',
        type: 'uint256',
      },
    ],
    name: 'getModulesInfoByListersBatch',
    outputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'moduleType',
            type: 'uint8',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'image',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'manifest',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'icon',
            type: 'tuple',
          },
          {
            internalType: 'string[]',
            name: 'interfaces',
            type: 'string[]',
          },
          {
            internalType: 'uint256',
            name: 'flags',
            type: 'uint256',
          },
        ],
        internalType: 'struct ModuleInfo[][]',
        name: 'modules',
        type: 'tuple[][]',
      },
      {
        internalType: 'address[][]',
        name: 'owners',
        type: 'address[][]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'lister',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'branch',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'offset',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'limit',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'reverse',
        type: 'bool',
      },
    ],
    name: 'getModulesOfListing',
    outputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'moduleType',
            type: 'uint8',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'image',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'manifest',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'icon',
            type: 'tuple',
          },
          {
            internalType: 'string[]',
            name: 'interfaces',
            type: 'string[]',
          },
          {
            internalType: 'uint256',
            name: 'flags',
            type: 'uint256',
          },
        ],
        internalType: 'struct ModuleInfo[]',
        name: 'modules',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'branch',
            type: 'string',
          },
          {
            internalType: 'bytes4',
            name: 'version',
            type: 'bytes4',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'binary',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'branch',
                type: 'string',
              },
              {
                internalType: 'bytes4',
                name: 'version',
                type: 'bytes4',
              },
            ],
            internalType: 'struct DependencyDto[]',
            name: 'dependencies',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'branch',
                type: 'string',
              },
              {
                internalType: 'bytes4',
                name: 'version',
                type: 'bytes4',
              },
            ],
            internalType: 'struct DependencyDto[]',
            name: 'interfaces',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256',
            name: 'flags',
            type: 'uint256',
          },
          {
            internalType: 'bytes4',
            name: 'extensionVersion',
            type: 'bytes4',
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256',
          },
        ],
        internalType: 'struct VersionInfoDto[]',
        name: 'lastVersions',
        type: 'tuple[]',
      },
      {
        internalType: 'address[]',
        name: 'owners',
        type: 'address[]',
      },
      {
        internalType: 'uint256',
        name: 'total',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNftContractAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'branch',
        type: 'string',
      },
      {
        internalType: 'bytes4',
        name: 'version',
        type: 'bytes4',
      },
    ],
    name: 'getVersionInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'branch',
            type: 'string',
          },
          {
            internalType: 'bytes4',
            name: 'version',
            type: 'bytes4',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'binary',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'branch',
                type: 'string',
              },
              {
                internalType: 'bytes4',
                name: 'version',
                type: 'bytes4',
              },
            ],
            internalType: 'struct DependencyDto[]',
            name: 'dependencies',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'branch',
                type: 'string',
              },
              {
                internalType: 'bytes4',
                name: 'version',
                type: 'bytes4',
              },
            ],
            internalType: 'struct DependencyDto[]',
            name: 'interfaces',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256',
            name: 'flags',
            type: 'uint256',
          },
          {
            internalType: 'bytes4',
            name: 'extensionVersion',
            type: 'bytes4',
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256',
          },
        ],
        internalType: 'struct VersionInfoDto',
        name: 'dto',
        type: 'tuple',
      },
      {
        internalType: 'uint8',
        name: 'moduleType',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'branch',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'offset',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'limit',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'reverse',
        type: 'bool',
      },
    ],
    name: 'getVersionsByModule',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'branch',
            type: 'string',
          },
          {
            internalType: 'bytes4',
            name: 'version',
            type: 'bytes4',
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'hash',
                type: 'bytes32',
              },
              {
                internalType: 'string[]',
                name: 'uris',
                type: 'string[]',
              },
            ],
            internalType: 'struct StorageRef',
            name: 'binary',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'branch',
                type: 'string',
              },
              {
                internalType: 'bytes4',
                name: 'version',
                type: 'bytes4',
              },
            ],
            internalType: 'struct DependencyDto[]',
            name: 'dependencies',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'string',
                name: 'branch',
                type: 'string',
              },
              {
                internalType: 'bytes4',
                name: 'version',
                type: 'bytes4',
              },
            ],
            internalType: 'struct DependencyDto[]',
            name: 'interfaces',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256',
            name: 'flags',
            type: 'uint256',
          },
          {
            internalType: 'bytes4',
            name: 'extensionVersion',
            type: 'bytes4',
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256',
          },
        ],
        internalType: 'struct VersionInfoDto[]',
        name: 'versions',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256',
        name: 'total',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'moduleName',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'admin',
        type: 'address',
      },
    ],
    name: 'removeAdmin',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'moduleName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'contextId',
        type: 'string',
      },
    ],
    name: 'removeContextId',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
