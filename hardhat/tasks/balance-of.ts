import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { getProviderRpcUrl } from "./utils";
import { providers } from "ethers";
import { MinHub, MinHub__factory } from "../typechain-types";
import { Spinner } from "../utils/spinner";

task("balance-of", "Gets the balance of MinHub for provided address")
  .addParam(`minhub`, `The address of the MinHub smart contract`)
  .addParam(
    `blockchain`,
    `The blockchain where the MinHub smart contract was deployed`
  )
  .addParam(`owner`, `The address to check the balance of MinHub`)
  .setAction(async (taskArguments: TaskArguments) => {
    const rpcProviderUrl = getProviderRpcUrl(taskArguments.blockchain);
    const provider = new providers.JsonRpcProvider(rpcProviderUrl);

    const spinner: Spinner = new Spinner();

    const Minhub: MinHub = MinHub__factory.connect(
      taskArguments.Minhub,
      provider
    );

    console.log(
      `ℹ️  Attempting to check the balance of MinHub (${taskArguments.Minhub}) for the ${taskArguments.owner} account`
    );
    spinner.start();

    const balanceOf = await Minhub.balanceOf(taskArguments.owner);

    spinner.stop();
    console.log(
      `ℹ️  The balance of Minhub of the ${
        taskArguments.owner
      } account is ${balanceOf.toNumber()}`
    );
  });
