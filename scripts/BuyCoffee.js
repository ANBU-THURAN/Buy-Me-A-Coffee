const BuyCoffee = require("../ignition/modules/BuyCoffee");
const hre = require("hardhat");

async function main() {
    const {BuyMeACoffee} = await hre.ignition.deploy(BuyCoffee);

    const [owner, tipper1, tipper2] = await hre.ethers.getSigners();

    if (!BuyMeACoffee) {
        throw new Error("Deployment failed: 'BuyMeACoffee' is undefined.");
    }

    const deployedAddress = await BuyMeACoffee.getAddress();
    console.log(`BuyCoffee deployed to: ${deployedAddress}`);

    //check the balance before
    await getBalance(deployedAddress);

    //buy some coffee to the owner
    const tx1 = await BuyMeACoffee.connect(tipper1).BuyACoffee("Joe", "Keep up the good work!", {
        value: hre.ethers.parseEther("0.1"), // Sending 0.1 ETH
    });

    //wait for transaction to be mined
    const receipt1 = await tx1.wait(1);

    const tx2 = await BuyMeACoffee.connect(tipper2).BuyACoffee("John", "You are doing a good job!!", {
        value: hre.ethers.parseEther("1"), //Sending 1 ETH
    })

    const receipt2 = await tx2.wait(1);

    //check the balance in contract after buying some coffee
    await getBalance(deployedAddress);

    //print the memos
    const memos = await BuyMeACoffee.getMemos();

    //Balance of owner before withdrawing funds
    await getBalance(await owner.getAddress());

    //withdraw funds from contract
    const tx = await BuyMeACoffee.withdrawTips();

    //wait for tx to be mined
    await tx.wait(1);

    //Balance of owner after withdrawing funds
    await getBalance(await owner.getAddress());

    await printMemos(memos);
}

async function getBalance(address) {
    const balance = await hre.ethers.provider.getBalance(address);
    const balanceString =  hre.ethers.formatEther(balance);
    console.log(`Balance at ${address} : ${balanceString}`);
    return balanceString;
}

async function getBalances(addresses) {
    let count = 0;
    for (const address of addresses) {
        console.log(`Address ${count}, balance : ${getBalance(address)}`);
        count++;
    }
}

async function printMemos(memos) {
    for(const memo of memos) {
        const from = memo.from;
        const name = memo.name;
        const at = memo.timestamp;
        const message = memo.message;
        console.log(`at ${at}, ${name}( ${from} ) said ${message}`);
    }
}

main()
 .then(() => process.exit(0))
 .catch((err) => console.log(err));