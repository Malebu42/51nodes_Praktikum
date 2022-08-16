// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SimpleStorage.sol";

contract StorageFactory {
    SimpleStorage[] public simpleStorageArray;
    //calls other contract
    function creatSimpleStorageContract() public{
        SimpleStorage simpleStorage = new SimpleStorage();
        simpleStorageArray.push(simpleStorage);
    }

    //Address and ABI (Application Binary Interface)

    function sfStore(uint256 _simpleStorageIndex, uint256 _simpleStorageNumber) public {
        //storage object get saved in the array
        SimpleStorage simpleStorage = simpleStorageArray[_simpleStorageIndex];//stores array index in simpleStorage
        simpleStorage.store(_simpleStorageNumber);  //stores number in storage
    }

    function sfGet(uint _simpleStorageIndex) public view  returns(uint256) {
        // for viewing content of the storage
        SimpleStorage simpleStorage = simpleStorageArray[_simpleStorageIndex];
        return simpleStorage.retrieve();
        //or return simpleStorageArray[_simpleStorageIndex].retrieve();
    }
    
}
