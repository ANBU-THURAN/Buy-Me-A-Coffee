const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("BuyCoffeeModule", (m) => {

  const BuyMeACoffee = m.contract("BuyMeACoffee", [], {});

  return { BuyMeACoffee };
});
