//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./GETokenV1.sol";

contract GETokenV2 is GETokenV1 {
    function burn(address _account, uint256 _amount) public {
        _burn(_account, _amount);
    }
}
