# MinHub NFT Platform

MinHub is an NFT platform built on the Ethereum Sepolia blockchain. It provides functionalities for minting NFTs, managing royalties, and interacting with the Chainlink network for cross-chain communication.

## Contracts

### MinHub.sol

MinHub.sol is the main contract that manages the NFT minting process, royalties, and other core functionalities.

#### Features

- ERC721Enumerable: Inherits from OpenZeppelin's ERC721Enumerable to enable enumeration of tokens.
- Minting: Users can mint NFTs by calling the `mint` function, specifying the destination chain, receiver address, payment method (native or LINK), and the number of NFTs to mint.
- Royalties: Creators are rewarded with royalties. The contract allows the owner to set and update royalty percentages for each creator.

1. **Contract Structure and Licensing:**

   - The contract specifies that it follows the MIT License.
   - It's written in Solidity version 0.8.20.

2. **Imports:**

   - The contract imports various interfaces and libraries from Chainlink and OpenZeppelin. These include LinkTokenInterface, IRouterClient, Client library, ERC721Enumerable, Ownable, and Strings.

3. **Contract Declaration:**

   - `MinHub` is declared as a contract that inherits from ERC721Enumerable and Ownable.

4. **Enum:**

   - The `PayFeesIn` enum is defined with two options: `Native` and `LINK`.

5. **State Variables:**

   - Several state variables are declared to store information like the base URI for token metadata, cost per mint, maximum supply, maximum mint amount per session, and others.

6. **Immutable Variables:**

   - `i_router` and `i_link` are declared as immutable variables representing the router and LINK token addresses.

7. **Mapping:**

   - The `royalties` mapping stores the royalty percentage for each creator.

8. **Event:**

   - `MessageSent` event is declared.

9. **Fallback Function:**

   - A receive function is defined to accept Ether/LINK.

10. **Constructor:**

    - The contract has a constructor that initializes various parameters such as the base URI, maximum supply, and the LINK token approval for the router. It also initializes royalties for creators.

11. **Initialization Function:**

    - The `initialize` function sets initial values for the contract state variables.

12. **Royalty Setting Function:**

    - The `setRoyalties` function sets royalty percentages for creators.

13. **Base URI Function:**

    - The `_baseURI` function returns the base URI for token metadata.

14. **Minting Function:**

    - The `mint` function allows users to mint NFTs. It checks conditions such as the number of NFTs to mint, maximum mint limit, total supply, and funds (Ether or LINK) sent. It then mints NFTs to the caller and triggers a Chainlink message to be sent.

15. **Wallet Query Function:**

    - The `walletOfOwner` function returns the NFT token IDs owned by a specific address.

16. **Token URI Function:**

    - The `tokenURI` function returns the token URI based on the current state of whether the NFT has been revealed.

17. **Reveal Function:**

    - The `reveal` function is used by the owner to mark the NFTs as revealed.

18. **Owner-Only Functions:**

    - Several functions (e.g., `setNftPerAddressLimit`, `setCost`, `setBaseURI`, etc.) can only be called by the owner of the contract.

19. **Withdraw Function:**

    - The `withdraw` function allows the owner to withdraw Ether from the contract.

20. **Chainlink Fee and Royalty Payment Functions:**

    - Functions like `sendChainlinkFees` and `payRoyalty` handle the payment of fees to Chainlink and royalties to creators.

21. **Purchase with LINK Function:**
    - The `purchaseWithLink` function allows users to purchase NFTs using LINK, triggering Chainlink messages and royalty payments.

This contract combines NFT minting functionality with Chainlink integration for cross-chain communication and royalty payments for creators.

#### Installation and Usage

1. Deploy the contract to the Ethereum Sepolia blockchain.
2. Customize contract parameters such as the base URI, maximum supply, and royalties.
3. Interact with the contract using functions like `mint`, `setRoyalty`, and others.

### DestinationMinter.sol

DestinationMinter.sol is a smart contract used for minting NFTs on a destination chain. It is part of the cross-chain communication process facilitated by the Chainlink network.

#### Features

- Chainlink Integration: Utilizes Chainlink functionalities for cross-chain communication.
- Dynamic Minting: Allows dynamic minting of NFTs on a specified destination chain.

#### Functions

- `mint`: Called by MinHub.sol to initiate the minting process on a destination chain.

#### Installation and Usage

1. Deploy the contract on the destination blockchain.
2. Ensure Chainlink integration is set up and configured.
3. Respond to Chainlink requests initiated by MinHub.sol by minting NFTs on the destination chain.

### MinHubExtender.sol

MinHubExtender.sol is an extension contract that can be deployed to add new functionalities to the MinHub platform.

#### Features

- Extension: Extends the capabilities of MinHub by providing additional functionalities.

#### Functions

- (Define functions provided by the extension)

#### Installation and Usage

1. Deploy the contract.
2. Customize contract parameters if necessary.
3. Users can interact with the extended functionalities provided by MinHubExtender.sol.

## Development

### Prerequisites

- Hardhat
- Solidity Compiler
- ethers
- Chainlink

### Installation

1. Clone the repository.
2. Install dependencies: `npm install`
3. Compile contracts: `npx hardhat compile`
4. Deploy contracts: [`npx hardhat deploy-minhub --network ethereumSepolia`]
   [`npx hardhat deploy-destination-minter --network polygonMumbai`]
   [`npx hardhat deploy-minhub --network ethereumSepolia`]
   [`npx hardhat deploy-minhub --network ethereumSepolia`]

### Testing

- Run tests: `npx hardhat test`

## Contributors

- Abdulazeez Muhammad Salihu <abdulazeezsalihu41@gmail.com>
- Toheeb Alade <>

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---
