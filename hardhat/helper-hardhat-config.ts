export interface NetworkConfigItem {
  //ethUsdPriceFeed?: string
  blockConfirmations?: number
  name?: string
  priceFeedRouter?: string
  ROUTER?: string
  TUSD?: string
}

export interface NetworkConfigInfo {
  [key: string]: NetworkConfigItem
}

export const networkConfig: NetworkConfigInfo = {
  localhost: {},
  hardhat: {},
  sepolia: {
    blockConfirmations: 6,
  },
  goerli: {
    blockConfirmations: 6,
  },
  
  scrollSepolia: {
    blockConfirmations: 6,
    name: "scrollSepolia",
    ROUTER: "0x873789aaf553fd0b4252d0d2b72c6331c47aff2e",
    TUSD: "0x7d682e65efc5c13bf4e394b8f376c48e6bae0355",
  },




export const developmentChains: string[] = ["hardhat", "localhost"]

export const ROUTER: string = "0xd0daae2231e9cb96b94c8512223533293c3693bf"
export const LINK: string = "0x779877A7B0D9E8603169DdbD7836e478b4624789"
