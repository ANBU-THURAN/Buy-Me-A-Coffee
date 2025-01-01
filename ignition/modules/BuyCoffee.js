const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const {ethers} = require("hardhat");

module.exports = buildModule("BuyCoffeeModule", (m) => {

  const BuyMeACoffee = m.contract("BuyMeACoffee", [], {});

  m.call(BuyMeACoffee, "BuyACoffee",["Anbu", "Hello"], {
      value: ethers.parseEther("1")
  });

  m.call(BuyMeACoffee, "getMemos", []);

  return { BuyMeACoffee };
});
