import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import {
  ContractAbi,
  ContractAddress
} from '../interfaces';

export default function useContract<T extends Contract = Contract>(
  address: ContractAddress,
  ABI: ContractAbi
): T | null {
  const { library, account, chainId } = useWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library || !chainId) {
      return null;
    }
    return new Contract(address, ABI, library.getSigner(account));
  }, [address, ABI, library, account]) as T;
}
