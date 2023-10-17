/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  MinHub_extender,
  MinHub_extenderInterface,
} from "../../../contracts/Minhub_extender.sol/MinHub_extender";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "_uri",
        type: "string",
      },
    ],
    name: "addProject",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "noOfProjects",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "projects",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "viewProjects",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "string",
            name: "uri",
            type: "string",
          },
        ],
        internalType: "struct MinHub_extender.Project[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061146e806100606000396000f3fe60806040526004361061004a5760003560e01c8063310f94111461004f578063314c1e251461007a5780633ccfd60b146100a55780634114d773146100af5780637ecdd3c5146100cb575b600080fd5b34801561005b57600080fd5b5061006461010d565b6040516100719190610c71565b60405180910390f35b34801561008657600080fd5b5061008f610415565b60405161009c9190610ca2565b60405180910390f35b6100ad61045f565b005b6100c960048036038101906100c49190610e5e565b610566565b005b3480156100d757600080fd5b506100f260048036038101906100ed9190610f2d565b61079b565b60405161010496959493929190610fc6565b60405180910390f35b6060600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b8282101561040c57838290600052602060002090600602016040518060c00160405290816000820180546101a19061106b565b80601f01602080910402602001604051908101604052809291908181526020018280546101cd9061106b565b801561021a5780601f106101ef5761010080835404028352916020019161021a565b820191906000526020600020905b8154815290600101906020018083116101fd57829003601f168201915b505050505081526020016001820180546102339061106b565b80601f016020809104026020016040519081016040528092919081815260200182805461025f9061106b565b80156102ac5780601f10610281576101008083540402835291602001916102ac565b820191906000526020600020905b81548152906001019060200180831161028f57829003601f168201915b50505050508152602001600282015481526020016003820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016004820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160058201805461037b9061106b565b80601f01602080910402602001604051908101604052809291908181526020018280546103a79061106b565b80156103f45780601f106103c9576101008083540402835291602001916103f4565b820191906000526020600020905b8154815290600101906020018083116103d757829003601f168201915b5050505050815250508152602001906001019061016e565b50505050905090565b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080549050905090565b3373ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146104ed576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104e4906110e8565b60405180910390fd5b60003373ffffffffffffffffffffffffffffffffffffffff164760405161051390611139565b60006040518083038185875af1925050503d8060008114610550576040519150601f19603f3d011682016040523d82523d6000602084013e610555565b606091505b505090508061056357600080fd5b50565b678ac7230489e800003410156105b1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105a89061119a565b60405180910390fd5b6105b96109cc565b8581600001819052508481602001819052508381604001818152505082816060019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505033816080019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050818160a00181905250600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081908060018154018082558091505060019003906000526020600020906006020160009091909190915060008201518160000190816106cc9190611366565b5060208201518160010190816106e29190611366565b506040820151816002015560608201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060808201518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060a08201518160050190816107909190611366565b505050505050505050565b600160205281600052604060002081815481106107b757600080fd5b9060005260206000209060060201600091509150508060000180546107db9061106b565b80601f01602080910402602001604051908101604052809291908181526020018280546108079061106b565b80156108545780601f1061082957610100808354040283529160200191610854565b820191906000526020600020905b81548152906001019060200180831161083757829003601f168201915b5050505050908060010180546108699061106b565b80601f01602080910402602001604051908101604052809291908181526020018280546108959061106b565b80156108e25780601f106108b7576101008083540402835291602001916108e2565b820191906000526020600020905b8154815290600101906020018083116108c557829003601f168201915b5050505050908060020154908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060050180546109499061106b565b80601f01602080910402602001604051908101604052809291908181526020018280546109759061106b565b80156109c25780601f10610997576101008083540402835291602001916109c2565b820191906000526020600020905b8154815290600101906020018083116109a557829003601f168201915b5050505050905086565b6040518060c00160405280606081526020016060815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001606081525090565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610a94578082015181840152602081019050610a79565b60008484015250505050565b6000601f19601f8301169050919050565b6000610abc82610a5a565b610ac68185610a65565b9350610ad6818560208601610a76565b610adf81610aa0565b840191505092915050565b6000819050919050565b610afd81610aea565b82525050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610b2e82610b03565b9050919050565b610b3e81610b23565b82525050565b600060c0830160008301518482036000860152610b618282610ab1565b91505060208301518482036020860152610b7b8282610ab1565b9150506040830151610b906040860182610af4565b506060830151610ba36060860182610b35565b506080830151610bb66080860182610b35565b5060a083015184820360a0860152610bce8282610ab1565b9150508091505092915050565b6000610be78383610b44565b905092915050565b6000602082019050919050565b6000610c0782610a2e565b610c118185610a39565b935083602082028501610c2385610a4a565b8060005b85811015610c5f5784840389528151610c408582610bdb565b9450610c4b83610bef565b925060208a01995050600181019050610c27565b50829750879550505050505092915050565b60006020820190508181036000830152610c8b8184610bfc565b905092915050565b610c9c81610aea565b82525050565b6000602082019050610cb76000830184610c93565b92915050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610d1382610aa0565b810181811067ffffffffffffffff82111715610d3257610d31610cdb565b5b80604052505050565b6000610d45610cbd565b9050610d518282610d0a565b919050565b600067ffffffffffffffff821115610d7157610d70610cdb565b5b610d7a82610aa0565b9050602081019050919050565b82818337600083830152505050565b6000610da9610da484610d56565b610d3b565b905082815260208101848484011115610dc557610dc4610cd6565b5b610dd0848285610d87565b509392505050565b600082601f830112610ded57610dec610cd1565b5b8135610dfd848260208601610d96565b91505092915050565b610e0f81610aea565b8114610e1a57600080fd5b50565b600081359050610e2c81610e06565b92915050565b610e3b81610b23565b8114610e4657600080fd5b50565b600081359050610e5881610e32565b92915050565b600080600080600060a08688031215610e7a57610e79610cc7565b5b600086013567ffffffffffffffff811115610e9857610e97610ccc565b5b610ea488828901610dd8565b955050602086013567ffffffffffffffff811115610ec557610ec4610ccc565b5b610ed188828901610dd8565b9450506040610ee288828901610e1d565b9350506060610ef388828901610e49565b925050608086013567ffffffffffffffff811115610f1457610f13610ccc565b5b610f2088828901610dd8565b9150509295509295909350565b60008060408385031215610f4457610f43610cc7565b5b6000610f5285828601610e49565b9250506020610f6385828601610e1d565b9150509250929050565b600082825260208201905092915050565b6000610f8982610a5a565b610f938185610f6d565b9350610fa3818560208601610a76565b610fac81610aa0565b840191505092915050565b610fc081610b23565b82525050565b600060c0820190508181036000830152610fe08189610f7e565b90508181036020830152610ff48188610f7e565b90506110036040830187610c93565b6110106060830186610fb7565b61101d6080830185610fb7565b81810360a083015261102f8184610f7e565b9050979650505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061108357607f821691505b6020821081036110965761109561103c565b5b50919050565b7f596f75206172656e277420746865206f776e6572000000000000000000000000600082015250565b60006110d2601483610f6d565b91506110dd8261109c565b602082019050919050565b60006020820190508181036000830152611101816110c5565b9050919050565b600081905092915050565b50565b6000611123600083611108565b915061112e82611113565b600082019050919050565b600061114482611116565b9150819050919050565b7f4e6f7420656e6f7567682066756e647320746f206164642070726f6a65637400600082015250565b6000611184601f83610f6d565b915061118f8261114e565b602082019050919050565b600060208201905081810360008301526111b381611177565b9050919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b60006008830261121c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826111df565b61122686836111df565b95508019841693508086168417925050509392505050565b6000819050919050565b600061126361125e61125984610aea565b61123e565b610aea565b9050919050565b6000819050919050565b61127d83611248565b6112916112898261126a565b8484546111ec565b825550505050565b600090565b6112a6611299565b6112b1818484611274565b505050565b5b818110156112d5576112ca60008261129e565b6001810190506112b7565b5050565b601f82111561131a576112eb816111ba565b6112f4846111cf565b81016020851015611303578190505b61131761130f856111cf565b8301826112b6565b50505b505050565b600082821c905092915050565b600061133d6000198460080261131f565b1980831691505092915050565b6000611356838361132c565b9150826002028217905092915050565b61136f82610a5a565b67ffffffffffffffff81111561138857611387610cdb565b5b611392825461106b565b61139d8282856112d9565b600060209050601f8311600181146113d057600084156113be578287015190505b6113c8858261134a565b865550611430565b601f1984166113de866111ba565b60005b82811015611406578489015182556001820191506020850194506020810190506113e1565b86831015611423578489015161141f601f89168261132c565b8355505b6001600288020188555050505b50505050505056fea264697066735822122047b85a9d37f3b45f6af50497bb972684f7a67d8a981cbb9356bc37d0712d530c64736f6c63430008130033";

type MinHub_extenderConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MinHub_extenderConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MinHub_extender__factory extends ContractFactory {
  constructor(...args: MinHub_extenderConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MinHub_extender> {
    return super.deploy(overrides || {}) as Promise<MinHub_extender>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MinHub_extender {
    return super.attach(address) as MinHub_extender;
  }
  override connect(signer: Signer): MinHub_extender__factory {
    return super.connect(signer) as MinHub_extender__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MinHub_extenderInterface {
    return new utils.Interface(_abi) as MinHub_extenderInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MinHub_extender {
    return new Contract(address, _abi, signerOrProvider) as MinHub_extender;
  }
}