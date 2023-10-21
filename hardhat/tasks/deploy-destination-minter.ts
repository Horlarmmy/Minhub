import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { getPrivateKey, getProviderRpcUrl, getRouterConfig } from "./utils";
import { Wallet, providers } from "ethers";
import {
  DestinationMinter,
  DestinationMinter__factory,
  MinHub,
  MinHub__factory,
  MinHub_extender,
  MinHub_extender__factory,
} from "../typechain-types";
import { Spinner } from "../utils/spinner";

task(
  `deploy-destination-minter`,
  `Deploys MinHub.sol and DestinationMinter.sol smart contracts`
)
  .addOptionalParam(
    `router`,
    `The address of the Router contract on the destination blockchain`
  )
  .setAction(
    async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
      const routerAddress = taskArguments.router
        ? taskArguments.router
        : getRouterConfig(hre.network.name).address;

      const privateKey = getPrivateKey();
      const rpcProviderUrl = getProviderRpcUrl(hre.network.name);

      const provider = new providers.JsonRpcProvider(rpcProviderUrl);
      const wallet = new Wallet(privateKey);
      const deployer = wallet.connect(provider);

      const creators = [
        "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
      ];

      const royalties = ["20", "50"];

      const spinner: Spinner = new Spinner();

      console.log(
        `ℹ️  Attempting to deploy MinHub smart contract on the ${hre.network.name} blockchain using ${deployer.address} address`
      );
      spinner.start();

      const MinhubFactory: MinHub__factory =
        (await hre.ethers.getContractFactory("MinHub")) as MinHub__factory;
      const Minhub: MinHub = await MinhubFactory.deploy(
        taskArguments.name || "MinHub",
        taskArguments.Symbol || "MHUB",
        taskArguments.baseURI ||
          "https://gateway.pinata.cloud/ipfs/QmYdWxbiwsfsYcW1CYQPgYujAc9FMLPG3fgFcxFskbSsFa",
        taskArguments.notRevealedURI || "",
        parseInt(taskArguments.maxSupply) || 10000,
        parseInt(taskArguments.maxMintAmount) || 5,
        parseInt(taskArguments.nftPerAddressLimit) || 10,
        creators,
        royalties,
        taskArguments.linkAddress,
        taskArguments.wrappedAddress
      );
      await Minhub.deployed();

      spinner.stop();
      console.log(
        `✅ MinHub contract deployed at address ${Minhub.address} on the ${hre.network.name} blockchain`
      );

      console.log("");
      console.log(
        `ℹ️  Attempting to deploy MinHub_extender contract on the ${hre.network.name} blockchain using ${deployer.address} address`
      );
      spinner.start();

      const minHubExtenderFactory: MinHub_extender__factory =
        (await hre.ethers.getContractFactory(
          "MinHub_extender"
        )) as MinHub_extender__factory;
      const minHubExtender: MinHub_extender =
        await minHubExtenderFactory.deploy();
      await minHubExtender.deployed();

      spinner.stop();
      console.log(
        `✅ MinHub_extender contract deployed at address ${minHubExtender.address} on the ${hre.network.name} blockchain`
      );
      console.log("");
      console.log(
        `ℹ️  Attempting to deploy DestinationMinter smart contract on the ${hre.network.name} blockchain using ${deployer.address} address, with the Router address ${routerAddress} provided as constructor argument`
      );
      spinner.start();

      const destinationMinterFactory: DestinationMinter__factory =
        (await hre.ethers.getContractFactory(
          "DestinationMinter"
        )) as DestinationMinter__factory;
      const destinationMinter: DestinationMinter =
        await destinationMinterFactory.deploy(routerAddress, Minhub.address);
      await destinationMinter.deployed();

      spinner.stop();
      console.log(
        `✅ DestinationMinter contract deployed at address ${destinationMinter.address} on the ${hre.network.name} blockchain`
      );

      console.log("");
      console.log(
        `ℹ️  Attempting to grant the minter role to the DestinationMinter smart contract`
      );
      spinner.start();

      const tx = await Minhub.transferOwnership(destinationMinter.address);
      await tx.wait();

      spinner.stop();
      console.log(
        `✅ DestinationMinter can now mint MinHub. Transaction hash: ${tx.hash}`
      );
    }
  );
