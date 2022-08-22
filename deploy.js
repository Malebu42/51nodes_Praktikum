const ethers = require("ethers"); //neds ether to run the contract
//const = constant, not changeable
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  //solidity one after other
  //javascript one while the other
  //HTTP://172.21.144.1:8545
  console.log(process.env.PRIVATE_KEY);
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  //const provider = ethers.getDefaultProvider();
  //const encryptedJson = fs.readFileSnyc("./.encryptedKey.jason", "utf8");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8"); //gets abi
  //let wallet = new ethers.Wallet.fromEncryptedJsonSny(encryptedJson, process.env.PRIVATE_KEY_PASSWORD);
  //wallet = await.connect(provider);
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet); //creates contract and passes arguments
  console.log("Deploying, please wait..."); //deploys contract
  const contract = await contractFactory.deploy(); // can add stuff in the deploy
  console.log(`Contract Address: ${contract.address}`);
  /*
  console.log(contract); //logs the contract
  const transactionReceipt = await contract.deployTransaction.wait(1); //wait for deploy
  console.log("Here is the deployment transaction: ");
  console.log(contract.deployTransaction); //gets transaction
  console.log("Here is the deployment receipt: ");
  console.log(transactionReceipt); //
    */
  const currentFavouriteNumber = await contract.retrieve(); // get initial value
  console.log(`Current Favourite Number: ${currentFavouriteNumber.toString()}`); //reads the var
  const transactionResponse = await contract.store(7); //transaction: store 7
  //const transactionReceipt = await contract.wait(1); // wait 1
  //const updatedFavouriteNumber = await contract.retreive();
  //console.log(`Updated favourite number is: ${updatedFavouriteNumber}`);
}

//waiting for finish fct
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
