// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MinHub_extender {
    struct Project {
        string name;
        string symbol;
        uint price;
        address contractAddress;
        address owner;
        string uri;
    }
    address private _owner;
    mapping(address => Project[]) public projects;

    modifier onlyOwner() {
        require(_owner == msg.sender, "You aren't the owner");
        _;
    }

    constructor() {
        _owner = msg.sender;
    }

    function addProject(
        string memory _name,
        string memory _symbol,
        uint256 _price,
        address _contractAddress,
        string memory _uri
    ) public payable {
        require(msg.value >= 5 ether, "Not enough funds to add project");
        Project memory newProject;
        newProject.name = _name;
        newProject.symbol = _symbol;
        newProject.price = _price;
        newProject.contractAddress = _contractAddress;
        newProject.owner = msg.sender;
        newProject.uri = _uri;

        projects[msg.sender].push(newProject);
    }

    function noOfProjects() public view returns (uint) {
        return projects[msg.sender].length;
    }

    function viewProjects() public view returns (Project[] memory) {
        return projects[msg.sender];
    }

    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success);
    }
}
