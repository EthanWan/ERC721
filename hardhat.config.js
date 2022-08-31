require('@nomiclabs/hardhat-waffle')
require('hardhat-abi-exporter')
require('solidity-coverage')

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.9',
  networks: {
    hardhat: {
      // hardhat london fork error fix for coverage
      initialBaseFeePerGas: 0,
    },
  },
  paths: {
    sources: './src/*',
    artifacts: './build',
    tests: './src/tests/*',
  },
  abiExporter: {
    path: './abi',
    clear: true,
    flat: true,
  },
}
