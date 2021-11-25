import useSWR from "swr";
import { Farm } from '../interfaces';
import useContract from './useContract';
import { SITES } from '../data/sites';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

function getTokenBalance(contract: any) {
  return (pid: number, address: string) => {
    return contract.pendingPanther(pid, address);
  };
}

export default function usePendingReward(
  farm: Farm
) {
  const site = SITES[farm.site];
  const c = useContract(site.chef, site.chefAbi);
  const { account } = useWeb3React<Web3Provider>();

  const result = useSWR(
    [farm.pid, account],
    getTokenBalance(c)
  );
  return {pending: result.data};
}
