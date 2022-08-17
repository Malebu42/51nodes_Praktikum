// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract FallbackExample {
    uint256 public result;

    receive() external payable { //get called everytime the contract get called
        result = 1;
    }

    fallback() external payable { //makes sure only matching input gets allowed
        result = 2;
    }
}
