import { ContractFactory, ethers } from "ethers";
import nft from "../../utils/MinHub.json";

const projectStruct =
  "(string name , string symbol ,uint price, address contractAddress, address owner, string uri)";
const abi = [
  "function addProject(string memory _name, string memory _symbol, uint256 _price, address _contractAddress, string memory _uri )  public payable",
  `function viewProjects() public view returns(${projectStruct}[] memory)`,
  "function noOfProjects() public view returns(uint)",
];

const contractAddr = "0x1f8854185f46B643544f0dCA3355Cc30212Ec48E";

const getContract = async () => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum); // A connection to the Ethereum network
    var signer = await provider.getSigner(); // Holds your private key and can sign things
    const Contract = new ethers.Contract(contractAddr, abi, signer);
    return Contract;
  } else {
    alert("No wallet detected");
  }
};

export async function viewProject() {
  const minHubContract = await getContract();
  var projects = await minHubContract.viewProjects();
  const structuredProjects = projects.map((project) => ({
    owner: project.owner,
    name: project.name,
    symbol: project.symbol,
    price: project.price.toNumber(),
    nftAddress: project.contractAddress,
    uri: project.uri,
  }));

  return structuredProjects;
}

export async function addProject(name, symbol, price, projectAddr, uri) {
  const minHubContract = await getContract();
  var tx = await minHubContract.addProject(
    name,
    symbol,
    price,
    projectAddr,
    uri,
    { value: 10000000000000000000n }
  );
  await tx.wait();
}

{
  /* <Step8 viewProjects={viewProjects} />; */
}

export const noOfProjects = async () => {
  const minHubContract = await getContract();
  count = await minHubContract.noOfProjects();
  // console.log(count);
  return count;
};

export async function mintNFT(projectAddr) {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum); // A connection to the Ethereum network
    var signer = await provider.getSigner(); // Holds your private key and can sign things
    const pContract = new ethers.Contract(projectAddr, nft.abi, signer);
    const mintTX = await pContract.mint(1, { value: 100000000000000000n });
    await mintTX.wait();
  } catch (error) {
    console.log(error);
  }
}
