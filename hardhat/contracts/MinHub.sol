// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/VRFV2WrapperConsumerBase.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MinHub is ERC721Enumerable, Ownable, VRFV2WrapperConsumerBase {
    using Strings for uint256;

    string public baseURI;
    string public baseExtension = ".json";
    string public notRevealedUri;

    struct RequestStatus {
        uint256 paid;
        bool fulfilled;
        uint256[] randomWords;
    }

    uint32 callbackGasLimit = 100000;
    uint16 requestConfirmations = 3;
    uint32 numWords = 2;

    uint256 feeAmount;
    uint256 public cost = .001 ether;
    uint256 public maxSupply;
    uint256 public maxMintAmount;
    uint256 public nftPerAddressLimit;
    uint256 public lastRequestId;
    uint256[] public requestIds;

    bool public revealed = false;

    address feeToken;
    address artist;

    mapping(address => uint256) public royalties;
    mapping(uint256 => RequestStatus) public requestStatuses;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        uint256 _maxSupply,
        uint256 _maxMintAmount,
        uint256 _nftPerAddressLimit,
        address[] memory _creators,
        uint256[] memory _royaltyPercentages,
        address _linkAddress,
        address _wrapperAddress
    )
        ERC721(_name, _symbol)
        VRFV2WrapperConsumerBase(_linkAddress, _wrapperAddress)
    {
        setBaseURI(_initBaseURI);
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

    function mint(uint256 _mintAmount) public payable returns (uint256[] memory) {
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

        uint256[] memory mintedIds = new uint256[](_mintAmount);

        for (uint256 i = 1; i <= _mintAmount; i++) {
            uint256 requestId = requestRandomTokenId();
            require(requestStatuses[requestId].fulfilled, "Random tokenId not generated yet");
            uint256 tokenId = generateRandomTokenId(requestId);
            _safeMint(msg.sender, tokenId);
            mintedIds[i - 1] = tokenId;
        }

        return mintedIds;
    }

    function generateRandomTokenId(uint256 requestId) internal view returns (uint256) {
        uint256[] memory randomWords = requestStatuses[requestId].randomWords;
        require(randomWords.length > 0, "Random words not available");

        uint256 tokenId = uint256(keccak256(abi.encodePacked(randomWords))) % maxSupply + 1;
        return tokenId;
    }

    function requestRandomTokenId() public returns (uint256) {
        require(totalSupply() < maxSupply, "Max NFT limit reached");

        uint256 requestId = requestRandomness(
            callbackGasLimit,
            requestConfirmations,
            numWords
        );
        requestStatuses[requestId] = RequestStatus(
            VRF_V2_WRAPPER.calculateRequestPrice(callbackGasLimit),
            false,
            new uint256[](0)
        );
        requestIds.push(requestId);
        lastRequestId = requestId;
        return requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        require(requestStatuses[_requestId].paid > 0, "Request not found");
        requestStatuses[_requestId].fulfilled = true;
        requestStatuses[_requestId].randomWords = _randomWords;
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

    function setMaxMintAmount(uint256 _newMaxMintAmount) public onlyOwner {
        maxMintAmount = _newMaxMintAmount;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function setTotalSupply(uint256 _maxSupply) public onlyOwner {
        maxSupply = _maxSupply;
    }

    function setRoyalty(address _creator, uint256 _royaltyPercentage)
        public
        onlyOwner
    {
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
}
