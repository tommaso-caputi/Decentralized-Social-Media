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

    struct post {
        string description;
        string _imgIpfs;
        address[] likes;
        uint256 creationDate;
        address creator;
    }

    mapping(address => account) public accounts;
    //mapping(address => string[]) public posts;
    post[] public posts;

    //functionsfor manage account

    function createAccount(
        string memory _nickname,
        string memory _bio,
        string memory _imgIpfs,
        string memory _name,
        string memory _surname
    ) public {
        accounts[msg.sender] = account(
            _nickname,
            block.timestamp,
            _bio,
            _imgIpfs,
            _name,
            _surname
        );
    }

    function getAccount(address _address) public view returns (account memory) {
        return accounts[_address];
    }

    function updateAccount(
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

    //--------------------------------------------------------------------------------------------------

    //functions for posts

    function createPost(string memory description, string memory _imgIpfs)
        public
    {
        address[] memory temp = new address[](0);
        posts.push(
            post(description, _imgIpfs, temp, block.timestamp, msg.sender)
        );
    }

    function getPostsNumber() public view returns (uint256) {
        return posts.length;
    }

    function getLastNPosts(uint256 n) public view returns (post[] memory) {
        post[] memory temp = new post[](n);
        for (uint256 i = 0; i < n; i++) {
            post storage t = posts[i];
            temp[i] = t;
        }
        return temp;
    }

    function getAllAccountPosts() public view returns (post[] memory) {
        post[] memory temp = new post[](posts.length);
        uint256 j = 0;
        for (uint256 i = 0; i < posts.length; i++) {
            post storage t = posts[i];
            if (t.creator == msg.sender) {
                temp[j] = t;
                j++;
            }
        }
        return temp;
    }

    function addLike(uint256 n) public {
        bool  check = true;
        for (uint256 i = 0; i < posts[n].likes.length; i++) {
            if (posts[n].likes[i]==msg.sender) {
                check = false;
            }
        }
        if (check){
            posts[n].likes.push(msg.sender);
        }
    }

    //---------------------------------------------------------------------------------------------------
}
