const BuyCoffee = require("../ignition/modules/BuyCoffee");
const hre = require("hardhat");

async function main() {
    const {BuyMeACoffee} = await hre.ignition.deploy(BuyCoffee);

    const deployedAddress = await BuyMeACoffee.getAddress();

    console.log(`BuyMeACoffee deployed to: ${deployedAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => console.log(err));