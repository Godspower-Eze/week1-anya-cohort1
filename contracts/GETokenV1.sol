//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract GETokenV1 is ERC20Upgradeable, OwnableUpgradeable {
    function initialize(string calldata _name, string calldata _symbol)
        external
        initializer
    {
        __ERC20_init(_name, _symbol);
        __Ownable_init();
        mint(_msgSender(), 10e9 * (10**decimals()));
    }

    function mint(address reciever, uint256 amount) public onlyOwner {
        _mint(reciever, amount);
    }
}
