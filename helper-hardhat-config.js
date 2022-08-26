
/*
function deployFunc() { //as a default deplyo func
    console.log("Hi!")
}

module.exports.default = deployFunc()
*/

const { networkConfig } = require("../helper-hardhat-config")
//shorter&easier way

module.exports = async (hre) => { //deploy automatic
    const { getNamedAccounts, deployments } = hre //get variables
    const {deploy, log } = deployments
    const {deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    const ethUsdPRiceFeedAddress = networkConfig[chainId]["ethUsdpriceFeed"]
    //for mock contracts

    const fundMe = await deploy("FundMe", { //deploys contract
        from: deployer,
        args: [/* address*/], // put price feedaddress in here
        log: true,
    })
}
