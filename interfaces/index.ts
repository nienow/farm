export type Farm = {
  id: number
  name: string
  site: string
  pid: number;
}

export type ContractAddress = string;
export type ContractAbi = any;

export type Site = {
  name: string;
  chef: ContractAddress;
  chefAbi: ContractAbi,
  token: ContractAddress,
  router: ContractAddress,
  routerAbi: ContractAbi
}
