// SPDX-License-Identifier: MIT  
pragma solidity ^0.8.23;
  
contract Greeter {  
    // peijun
    string private greeting;
  
    constructor(string memory _greeting) {  
        greeting = _greeting;  
    }  
  
    function greet() public view returns (string memory) {  
        return greeting;  
    }  
}