// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {MinHub} from "./MinHub.sol";

contract DestinationMinter is CCIPReceiver {
    MinHub minHub;

    event MintCallSuccessful();

    constructor(
        address router,
        address nftCollectionAddress
    ) CCIPReceiver(router) {
        minHub = MinHub(nftCollectionAddress);
    }

    function _ccipReceive(
        Client.Any2EVMMessage memory message
    ) internal override {
        (bool success, ) = address(minHub).call(message.data);
        require(success, "Minting MinHub NFT failed");
        emit MintCallSuccessful();
    }
}
