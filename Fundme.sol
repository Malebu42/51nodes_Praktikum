// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "./PriceConverter.sol";
//note; npm

error NotOwner();
contract FundMe {
    using PriceConverter for uint256;
    //constant for cheaper gas price
    uint256 public constant MINIMUM_USD = 50 * 1e18; //use chainlink / blockchain oracle
    //for funding to a wallet

    //who funds?
    address[] public  funders; 
    mapping(address => uint256) public addressToAmountFunded;

    address public immutable i_owner; //makes cheaper gas for one time use 
    constructor () { //gets called at the start
        i_owner = msg.sender;
    }

    function fund() public payable{
        //minimum fund amount (in ETH)
        
        require(getConversionRate(msg.value) > MINIMUM_USD, "didn't send enough"); // 1E18 = 1*10**18
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

    function withdraw() public onlyOwner {
        //require(msg.sender == owner, "Sender is not Owner"); //check for owner
        //for(starting  index, edning index, step amount)
        for(uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
            address funder = funders[funderIndex]; //returns funder ddress
            addressToAmountFunded[funder] = 0;
        }
        //reset array
        funders = new address[](0);

        //transfer
        //msg.sender = addresss, payable = payable address
        payable(msg.sender).transfer(address(this).balance); 
        /*
        // send
        bool sendSuccess payable(msg.sender).transfer(address(this).balance); //check for sendable
        require(sendSuccess, "Send failed");
        */
        //call
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        //returns if the call was success and the call's data
        require(callSuccess, "Call failed");
    }

    modifier onlyOwner { //modifier to stick to functions
        //require(msg.sender == i_owner, "Sender is not Owner"); //require first, then code
        if(msg.sender != i_owner) {revert NotOwner(); } //save gas
        _; //_; stands for run code
    }

    receive() external payable { //makes sure users type in the right things
        fund();
    }

    fallback() external payable { //makes sure the user uses fund()
        fund();
    }
 }
