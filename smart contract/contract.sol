// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract DSMContract {
    struct account {
        string nickname;
        uint256 creationDate;
        string bio;
        string imgIpfs;
        string name;
        string surname;
    }

    mapping(address => account) public accounts;
    mapping(address => string[]) public posts;

    function createAccount(
        string memory _nickname,
        uint256 _creationDate,
        string memory _bio,
        string memory _imgIpfs,
        string memory _name,
        string memory _surname
    ) public {
        accounts[msg.sender] = account(
            _nickname,
            _creationDate,
            _bio,
            _imgIpfs,
            _name,
            _surname
        );
    }

    function getAccount(address _address) public view returns (account memory) {
        return accounts[_address];
    }
    
}
