import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { getPrivateKey, getProviderRpcUrl, getRouterConfig } from "./utils";
import { Wallet, providers } from "ethers";
import verify from "../helper-functions";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import {
  MinHub,
  MinHub__factory,
  MinHub_extender,
  MinHub_extender__factory,
} from "../typechain-types";
import { Spinner } from "../utils/spinner";

task(`deploy-minhub`, `Deploys MinHub.sol and MinHub_extender.sol contracts`)
  .addOptionalParam(`baseURI`, `Base URI for token metadata`)
  .addOptionalParam(`notRevealedURI`, `URI for unrevealed tokens`)
  .addOptionalParam(`maxSupply`, `Maximum supply of NFTs`)
  .addOptionalParam(`maxMintAmount`, `Maximum mint amount per session`)
  .addOptionalParam(`nftPerAddressLimit`, `Maximum NFTs per address`)
  .setAction(
    async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
      const privateKey = getPrivateKey();
      const rpcProviderUrl = getProviderRpcUrl(hre.network.name);

      const provider = new providers.JsonRpcProvider(rpcProviderUrl);
      const wallet = new Wallet(privateKey);
      const deployer = wallet.connect(provider);

      const royalties = ["20", "50"];

      const spinner: Spinner = new Spinner();

      console.log(
        `ℹ️  Attempting to deploy MinHub contract on the ${hre.network.name} blockchain using ${deployer.address} address`
      );
      spinner.start();

      const minHubFactory: MinHub__factory =
        (await hre.ethers.getContractFactory("MinHub")) as MinHub__factory;
      const minHub: MinHub = await minHubFactory.deploy(
        taskArguments.name || "MinHub",
        taskArguments.Symbol || "MHUB",
        taskArguments.baseURI || "",
        taskArguments.notRevealedURI || "",
        parseInt(taskArguments.maxSupply) || 10000,
        parseInt(taskArguments.maxMintAmount) || 5,
        parseInt(taskArguments.nftPerAddressLimit) || 10,

        royalties
      );
      await minHub.deployed();

      spinner.stop();
      console.log(
        `✅ MinHub contract deployed at address ${minHub.address} on the ${hre.network.name} blockchain`
      );

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
    }
  );
