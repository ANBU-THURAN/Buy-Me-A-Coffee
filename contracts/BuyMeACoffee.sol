//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

//Deployed to Sepolia : 0xD6c45474873fC6f8eD29307F261A6514346Eb615

contract BuyMeACoffee {
    //Event to emit when memo is created
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    //struct of memo
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    //List of Memos
    Memo[] memos;

    //address of contract deployer
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    /**
    * @dev function to buy the owner a coffee
    * @param _name name of the coffee buyer
    * @param _message message from the coffee buyer
    */
    function BuyACoffee(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "Cannot buy a coffee with 0 eth");

        memos.push(Memo (
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));

        emit NewMemo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        );
    }

    /**
    * @dev sends all the funds in contract to the owner
    */
    function withdrawTips() public {
        require(owner.send(address(this).balance));
    }

    /**
    * @dev retrieves all the memos received and stored in blockchain
    */
    function getMemos() public view returns(Memo[] memory) {
        return memos;
    }

    /**
    * @dev returns the owner of the contract
    */
    function getOwner() public view returns(address) {
        return owner;
    }
}