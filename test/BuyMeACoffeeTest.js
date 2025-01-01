const { expect } = require("chai");
const BuyCoffee = require("../ignition/modules/BuyCoffee.js");
const hre = require("hardhat");

describe("BuyMeACoffee", function () {

  let Coffee;
  let signer, tipper1, tipper2;

  beforeEach(async function () {
    [signer, tipper1, tipper2] = await hre.ethers.getSigners();
    Coffee = await hre.ignition.deploy(BuyCoffee);
  })

  describe("constructor", function () {
    it("Should set the owner correctly", async function () {
      let {BuyMeACoffee} = Coffee;
      const owner = await BuyMeACoffee.getOwner();
      expect(owner).to.equal(signer);
    });
  });

  describe("BuyACoffee", function () {
    it("Should add memo to list of memos", async function () {
      let {BuyMeACoffee} = Coffee;

      //Buy some coffees
      const tx1 = await BuyMeACoffee.connect(tipper1).BuyACoffee("Joe", "Keep up the good work!", {
        value: hre.ethers.parseEther("0.1"), // Sending 0.1 ETH
      });
      await tx1.wait(1);

      const tx2 = await BuyMeACoffee.connect(tipper2).BuyACoffee("John", "You are doing a good job!!", {
        value: hre.ethers.parseEther("1"), //Sending 1 ETH
      })
      await tx2.wait(1);

      const memos = await BuyMeACoffee.getMemos();

      expect(memos.length).to.equal(2);
      expect(memos[0].from).to.equal(tipper1);
      expect(memos[1].from).to.equal(tipper2);
    });

    it("Reverts if eth sent is less than or equal to 0", async function () {
      let {BuyMeACoffee} = Coffee;

      await expect (
          BuyMeACoffee.connect(tipper1).BuyACoffee("John", "Hello how you doing?", {
            value: hre.ethers.parseEther("0.0"),
          })
      ).to.be.revertedWith("Cannot buy a coffee with 0 eth");
    })
  })
});
