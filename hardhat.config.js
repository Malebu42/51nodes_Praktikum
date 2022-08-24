require('@nomicfoundation/hardhat-toolbox');
require('@nomiclabs/hardhat-etherscan');
require('@nomicfoundation/hardhat-chai-matchers');
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan'); //for autoverifiy

/** @type import('hardhat/config').HardhatUserConfig */
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL;

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      chainId: 4,
      accounts: [PRIVATE_KEY],
    },
  },
  solidity: '0.8.9',
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

//RINKEBY_RPC_URL
//[PRIVATE_KEY]
