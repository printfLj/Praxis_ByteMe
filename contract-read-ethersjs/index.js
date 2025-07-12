// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
    // Metadata
    string public name = "Praxis";
    string public symbol = "Praxis";

    // Supply
    uint256 public totalSupply = 1000000000000000000000;

    // Ownership
    address public owner;

    // Balance mapping
    mapping(address => uint256) public balances;

    // Events
    event Transfer(address indexed from, address indexed to, uint256 value);

    // Constructor: Assign all tokens to deployer
    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    // Transfer function
    function transfer(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }

    // Check balance
    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }
}
