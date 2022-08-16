// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
//note; npm
contract FundMe {
    
    uint256 public minimunUsd = 50 * 1e18; //use chainlink / blockchain oracle
    //for funding to a wallet

    //who funds?
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    function fund() public payable{
        //minimum fund amount (in ETH)
        
        require(getConversionRate(msg.value) > minimunUsd, "didn't send enough"); // 1E18 = 1*10**18
        funders.push(msg.sender); //for security (msg.sender for who reads, msg.value for the value)
        addressToAmountFunded[msg.sender] = msg.value; // saves values for each sender
        //reverts any remaining gas
    }

    function getPrice() public view returns(uint256) {
        // ABi
        // Address 0xaEA2808407B7319A31A383B6F8B60f04BCa23cE2
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0xaEA2808407B7319A31A383B6F8B60f04BCa23cE2);
        (uint256 price,,,,) = priceFeed.latestRoundData(); //return these vars (ETH in USD)
        // unused vars can be left out (,,,)
        return uint256(price * 1e10); // 1**10
    }

    function getVersion() public view returns (uint256) {
        AggregatorV3Interface priceFeed =  AggregatorV3Interface(0xaEA2808407B7319A31A383B6F8B60f04BCa23cE2);
        return priceFeed.version(); //see Price fro Eth
    }


    function getConversionRate(uint256 ethAmount) public view returns (uint256) { 
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
        return ethAmountInUsd; //calc eth in usd and return
    }
    //function withdraw() {}

    
}
