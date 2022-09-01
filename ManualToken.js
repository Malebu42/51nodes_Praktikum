/ SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract ManualToken {
    uint256 initialSupply;
    mapping(address => uint256) public balanceOf; //how much is on the tokens
    mapping(address => mapping(address => uint256)) public allowance;

    function transfer(
        address from,
        address to,
        uint256 amount
    ) public {
        balanceOf[from] = balanceOf[from] - amount;
        balanceOf[to] += amount;
    }

    function transferFrom() public {
        //takes funds from user
        //checks transfers
    }
}
