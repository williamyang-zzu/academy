// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract OtherContract { // sepolia deploy address 0x91d5a120B229C71d6667B599BAC0aa4f96675031
    uint256 private _x = 0; // 状态变量x
    // 收到eth事件，记录amount和gas
    event Log(uint amount, uint gas);
    
    // 返回合约ETH余额
    function getBalance() view public returns(uint) {
        return address(this).balance;
    }

    // 可以调整状态变量_x的函数，并且可以往合约转ETH (payable)
    function setX(uint256 x) external payable {
        _x = x;
        // 如果转入ETH，则释放Log事件
        if(msg.value > 0){
            emit Log(msg.value, gasleft());
        }
    }

    // 读取x
    function getX() external view returns(uint x) {
        x = _x;
    }
}

// sepolia deploy address 0x9a7cf5521cFae6E664cBe1D4107093dC84fce1c5
contract CallContract {
    function callSetX(address _Address, uint256 x) external {
        OtherContract(_Address).setX(x);
    }

    function callGetX(OtherContract _Address) external view returns(uint x) {
        x = _Address.getX();
    }

    function callGetX2(address _Address) external view returns(uint x) {
        OtherContract oc = OtherContract(_Address);
        x = oc.getX();
    }

    function setXTransferETH(address otherContract, uint256 x) payable external {
        OtherContract(otherContract).setX{value: msg.value}(x);
    }
}