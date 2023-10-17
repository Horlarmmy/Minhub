// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MinHub is ERC721Enumerable, Ownable {
    using Strings for uint256;

    string public baseURI;
    string public baseExtension = ".json";
    string public notRevealedUri;

    uint256 feeAmount;
    uint256 public cost = .05 ether;
    uint256 public maxSupply;
    uint256 public maxMintAmount;
    uint256 public nftPerAddressLimit;

    bool public revealed = false;

    address feeToken;
    address artist;
    mapping(address => uint256) public royalties;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        string memory _initNotRevealedUri,
        uint256 _maxSupply,
        uint256 _maxMintAmount,
        uint256 _nftPerAddressLimit,
        address[] memory _creators,
        uint256[] memory _royaltyPercentages
    ) ERC721(_name, _symbol) {
        setBaseURI(_initBaseURI);
        setNotRevealedURI(_initNotRevealedUri);
        maxSupply = _maxSupply;
        maxMintAmount = _maxMintAmount;
        nftPerAddressLimit = _nftPerAddressLimit;

        require(
            _creators.length == _royaltyPercentages.length,
            "Mismatch between creators and royalty percentages"
        );

        for (uint256 i = 0; i < _creators.length; i++) {
            require(
                _royaltyPercentages[i] <= 100,
                "Royalty percentage cannot exceed 100"
            );
            royalties[_creators[i]] = _royaltyPercentages[i];
        }
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function mint(uint256 _mintAmount) public payable {
        uint256 supply = totalSupply();
        require(_mintAmount > 0, "need to mint at least 1 NFT");
        require(
            _mintAmount <= maxMintAmount,
            "max mint amount per session exceeded"
        );
        require(supply + _mintAmount <= maxSupply, "max NFT limit exceeded");

        if (msg.sender != owner()) {
            uint256 ownerTokenCount = balanceOf(msg.sender);
            require(
                ownerTokenCount + _mintAmount <= nftPerAddressLimit,
                "max NFT per address exceeded"
            );
            require(msg.value >= cost * _mintAmount, "insufficient funds");
        }

        for (uint256 i = 1; i <= _mintAmount; i++) {
            _safeMint(msg.sender, supply + i);
        }
    }

    function walletOfOwner(
        address _owner
    ) public view returns (uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (revealed == false) {
            return notRevealedUri;
        }

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    // Only Owner
    function reveal() public onlyOwner {
        revealed = true;
    }

    function setNftPerAddressLimit(uint256 _limit) public onlyOwner {
        nftPerAddressLimit = _limit;
    }

    function setCost(uint256 _newCost) public onlyOwner {
        cost = _newCost;
    }

    function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
        maxMintAmount = _newmaxMintAmount;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(
        string memory _newBaseExtension
    ) public onlyOwner {
        baseExtension = _newBaseExtension;
    }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function setTotalSupply(uint256 _maxSupply) public onlyOwner {
        maxSupply = _maxSupply;
    }
}
