require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");

// cross the great wall,if you are using a vpn, 
// https://github.com/smartcontractkit/full-blockchain-solidity-course-js/discussions/2247#discussioncomment-5496669
const { ProxyAgent, setGlobalDispatcher } = require("undici");
const proxyAgent = new ProxyAgent("http://127.0.0.1:9999");
setGlobalDispatcher(proxyAgent);

// Ensure your configuration variables are set before executing the script
const { vars } = require("hardhat/config");

// Go to https://infura.io, sign up, create a new API key
// in its dashboard, and add it to the configuration variables
const INFURA_API_KEY = vars.get("INFURA_API_KEY");
//npx hardhat verify --network sepolia 0x9af3a54bf636e20985a05d0af0c31622c34d6860 "bitlayertothemoon"

// Add your Sepolia account private key to the configuration variables
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");

const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");

console.log('INFURA_API_KEY', INFURA_API_KEY);
console.log('SEPOLIA_PRIVATE_KEY', SEPOLIA_PRIVATE_KEY);
console.log('ETHERSCAN_API_KEY', ETHERSCAN_API_KEY);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.23", // 配置自己项目使用的solidity version
    settings: {
      // 这部分按需配置
      optimizer:{
        enabled: true,
        runs: 200,
      }
    }
  },
  //solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
    bitlayertestnet: {
      url: 'https://testnet-rpc.bitlayer.org',
      chainId: 200810,
      accounts: [SEPOLIA_PRIVATE_KEY]
    },
    bitlayer: {
      url: 'https://mainnet-rpc.bitlayer.org',
      chainId: 200901,
      accounts: [SEPOLIA_PRIVATE_KEY]
    },
  },
  // ...rest of the config...
  etherscan: {
    //apiKey: ETHERSCAN_API_KEY,
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
      // api key需要写一个，hardhat-verify插件会要求写，不写的话校验不过去
      // 当前浏览器还没开启api key的校验，可以先随意写一个字符串
      bitlayertestnet: "1234",
      bitlayer: "1234"
    },
    customChains: [
      {
        network: "bitlayertestnet",
        chainId: 200810,
        urls: {
          // apiURL: "https://dev-blockser-gateway-api.bitlayerapps.org/api",
          // browserURL: "https://dev-blockser-gateway-api.bitlayerapps.org/"
          apiURL: "https://api-testnet.btrscan.com/scan/api",
          browserURL: "https://testnet.btrscan.com/"
        }
      },
      {
        network: "bitlayer",
        chainId: 200901,
        urls: {
          apiURL: "https://api.btrscan.com/scan/api",
          browserURL: "https://www.btrscan.com/"
        }
      }
    ]
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: false
  }
};
