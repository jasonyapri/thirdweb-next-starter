// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Base contract for access control
contract Ownable {
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }
}

// Tokenized Property Contract inheriting from Ownable
contract TokenizedProperty is Ownable {
    string public propertyAddress;
    uint256 public totalShares;
    mapping(address => uint256) public shares;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );
    event SharesTransferred(
        address indexed from,
        address indexed to,
        uint256 amount
    );
    event SharesPurchased(address indexed buyer, uint256 amount);
    event Withdrawal(address indexed owner, uint256 amount);

    constructor(string memory _propertyAddress, uint256 _totalShares) {
        propertyAddress = _propertyAddress;
        totalShares = _totalShares;
        shares[msg.sender] = _totalShares; // Owner starts with all shares
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function transferShares(address to, uint256 amount) public {
        require(shares[msg.sender] >= amount, "Insufficient shares");
        require(to != address(0), "Invalid address");

        shares[msg.sender] -= amount; // Effects
        shares[to] += amount;

        emit SharesTransferred(msg.sender, to, amount); // Interaction
    }

    function buyShares() public payable {
        uint256 sharesToBuy = msg.value / 1 ether; // Example conversion rate
        require(shares[owner] >= sharesToBuy, "Not enough shares available");

        shares[owner] -= sharesToBuy; // Effects
        shares[msg.sender] += sharesToBuy;

        emit SharesPurchased(msg.sender, sharesToBuy); // Interaction
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;

        (bool success, ) = payable(owner).call{value: balance}("");
        require(success, "Transfer failed");

        emit Withdrawal(owner, balance);
    }

    receive() external payable {}
}
