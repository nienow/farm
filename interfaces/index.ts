import {BigNumber} from "ethers";

export type Farm = {
  // id: number
  name?: string
  chef: ContractAddress;
  pid: number;
  lpToken: ContractAddress;
  allocPoint: BigNumber;
  depositFeeBP: number;
  harvestInterval: BigNumber;
}

export type ContractAddress = string;
export type ContractAbi = any;

export type Site = {
  name: string;
  chef: ContractAddress;
  chefAbi: ContractAbi,
  token: ContractAddress,
  router: ContractAddress,
  routerAbi: ContractAbi,
  referralRate?: number;
  tokenPerBlock: BigNumber;
  totalAllocPoint: BigNumber;
  bonusMultiplier?: BigNumber;
  maxDepositFee?: BigNumber;
  maxReferralRate?: BigNumber;
  maxHarvestInterval?: BigNumber;
  farms: Farm[];
}

export type PoolInfo = {
  lpToken: string;
  allocPoint: BigNumber;
  depositFeeBP: number;
  harvestInterval: BigNumber;
}
