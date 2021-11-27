import ERC20_ABI from "../contracts/ERC20.json";
import useContract from "./useContract";
import { ContractAddress } from '../interfaces';

export default function useTokenContract(tokenAddress: ContractAddress) {
  return useContract(tokenAddress, ERC20_ABI);
}
