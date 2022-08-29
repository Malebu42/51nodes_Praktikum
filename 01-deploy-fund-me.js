
/*
function deployFunc() { //as a default deplyo func
    console.log("Hi!")
}

module.exports.default = deployFunc()
*/

const { networkConfig } = require("../helper-hardhat-config")
const { network } = require("hardhat")
//shorter&easier way

module.exports = async (hre) => { //deploy automatic
    const { getNamedAccounts, deployments } = hre //get variables
    const {deploy, log } = deployments
    const {deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    //for mock contracts

    const fundMe = await deploy("FundMe", { //deploys contract
        from: deployer,
        args: [ethUsdPriceFeedAddress], // put price feedaddress in here
        log: true,
    })
}
