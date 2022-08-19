const ethers = require("ethers"); //neds ether to run the contract
//const = constant, not changeable
const fs = require("fs-extra");

async function main() {
  //solidity one after other
  //javascript one while the other
  //https://0.0.0.0:8545
  const provider = new ethers.providers.JsonRpcProvider(
    "HTTP://172.24.224.1:8545"
  );
  //const provider = ethers.getDefaultProvider();
  const wallet = new ethers.Wallet(
    "f1138225186f5bbfe00c7fde395233bf11e1004f69d842a2c7ad31678941e338",
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8"); //gets abi
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet); //creates contract and passes arguments
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy(); //deploys contract
  console.log(contract);
}

//waiting for finish fct
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
