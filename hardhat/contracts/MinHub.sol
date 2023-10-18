// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MinHub is ERC721Enumerable, Ownable {
    enum PayFeesIn {
        Native,
        LINK
    }

    using Strings for uint256;

    string public baseURI;
    string public baseExtension = ".json";
    string public notRevealedUri;

    uint256 public cost = 0.001 ether;
    uint256 public maxSupply;
    uint256 public maxMintAmount;
    uint256 public nftPerAddressLimit;

    bool public revealed = false;

    address immutable i_router;
    address immutable i_link;

    mapping(address => uint256) public royalties;

    event MessageSent(bytes32 messageId);

    receive() external payable {}

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        string memory _initNotRevealedUri,
        uint256 _maxSupply,
        uint256 _maxMintAmount,
        uint256 _nftPerAddressLimit,
        address router,
        address link,
        uint256[] memory _royaltyPercentages
    ) ERC721(_name, _symbol) {
        initialize(
            _initBaseURI,
            _initNotRevealedUri,
            _maxSupply,
            _maxMintAmount,
            _nftPerAddressLimit
        );
        setRoyalties(_royaltyPercentages);
        i_router = router;
        i_link = link;
        LinkTokenInterface(i_link).approve(i_router, type(uint256).max);
    }

    function initialize(
        string memory _initBaseURI,
        string memory _initNotRevealedUri,
        uint256 _maxSupply,
        uint256 _maxMintAmount,
        uint256 _nftPerAddressLimit
    ) internal {
        baseURI = _initBaseURI;
        notRevealedUri = _initNotRevealedUri;
        maxSupply = _maxSupply;
        maxMintAmount = _maxMintAmount;
        nftPerAddressLimit = _nftPerAddressLimit;
    }

    function setRoyalties(uint256[] memory _royaltyPercentages) internal {
        require(
            _royaltyPercentages.length > 0,
            "Royalty percentages must be provided"
        );

        for (uint256 i = 0; i < _royaltyPercentages.length; i++) {
            require(
                _royaltyPercentages[i] <= 100,
                "Royalty percentage cannot exceed 100"
            );
            royalties[owner()] = _royaltyPercentages[i];
        }
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function mint(
        uint64 destinationChainSelector,
        address receiver,
        PayFeesIn payFeesIn,
        uint256 _mintAmount
    ) external payable {
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

            if (payFeesIn == PayFeesIn.LINK) {
                uint256 totalCost = cost * _mintAmount;
                sendChainlinkFees(totalCost);
            } else {
                require(msg.value >= cost * _mintAmount, "insufficient funds");
            }
        }

        for (uint256 i = 1; i <= _mintAmount; i++) {
            _safeMint(msg.sender, supply + i);
        }

        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: abi.encodeWithSignature("mint(address)", msg.sender),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: "",
            feeToken: payFeesIn == PayFeesIn.LINK ? i_link : address(0)
        });

        uint256 fee = IRouterClient(i_router).getFee(
            destinationChainSelector,
            message
        );

        bytes32 messageId;

        if (payFeesIn == PayFeesIn.LINK) {
            messageId = IRouterClient(i_router).ccipSend(
                destinationChainSelector,
                message
            );
        } else {
            messageId = IRouterClient(i_router).ccipSend{value: fee}(
                destinationChainSelector,
                message
            );
        }

        emit MessageSent(messageId);
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

    function setRoyalty(
        address _creator,
        uint256 _royaltyPercentage
    ) public onlyOwner {
        require(
            _royaltyPercentage <= 100,
            "Royalty percentage cannot exceed 100"
        );
        royalties[_creator] = _royaltyPercentage;
    }

    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success);
    }

    function sendChainlinkFees(uint256 _amount) internal {
        require(_amount > 0, "Amount must be greater than 0");
        require(i_link != address(0), "Link address not set");

        LinkTokenInterface(i_link).transferFrom(
            msg.sender,
            address(this),
            _amount
        );
    }

    function payRoyalty() internal {
        require(
            royalties[owner()] > 0,
            "Royalty percentage not set for creator"
        );
        uint256 royaltyAmount = (cost * royalties[owner()]) / 100;

        require(royaltyAmount > 0, "Royalty amount too small");

        payable(owner()).transfer(royaltyAmount);
    }

    function purchaseWithLink(uint256 _mintAmount) public {
        require(_mintAmount > 0, "need to mint at least 1 NFT");
        require(
            _mintAmount <= maxMintAmount,
            "max mint amount per session exceeded"
        );
        require(
            totalSupply() + _mintAmount <= maxSupply,
            "max NFT limit exceeded"
        );
        require(msg.sender != owner(), "Owner cannot purchase");

        uint256 ownerTokenCount = balanceOf(msg.sender);
        require(
            ownerTokenCount + _mintAmount <= nftPerAddressLimit,
            "max NFT per address exceeded"
        );

        uint256 totalCost = cost * _mintAmount;
        sendChainlinkFees(totalCost);

        for (uint256 i = 1; i <= _mintAmount; i++) {
            uint256 tokenId = totalSupply() + i;
            _safeMint(msg.sender, tokenId);
            payRoyalty();
        }
    }
}
