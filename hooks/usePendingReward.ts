import { Farm } from '../interfaces';
import useContract from './useContract';
import { SITES } from '../data/sites';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import {
  BigNumber,
  BigNumberish
} from 'ethers';
import {
  useEffect,
  useState
} from 'react';
import { useDebug } from '../providers/DebugProvider';
import useTokenPrice from './useTokenPrice';
import {WeiPerEther} from "@ethersproject/constants";

export default function usePendingReward(
  farm: Farm
) {
  const site = SITES[farm.site];
  const chef = useContract(site.chef, site.chefAbi);
  const router = useContract(site.router, site.routerAbi);
  const { account } = useWeb3React<Web3Provider>();
  const [pending, setPending] = useState<BigNumberish>(0);
  const { addLog } = useDebug();
  const { price, bestRoute } = useTokenPrice(site);
  const [ value, setValue ] = useState<BigNumberish>(0);

  useEffect(() => {
    if (chef && router) {
      addLog('fetching pending for ' + farm.pid);
      chef.pendingPanther(farm.pid, account).then((balance: BigNumberish) => {
        setPending(balance);
      });
    }
  }, [chef, router]);

  useEffect(() => {
    if (pending && price) {
      setValue((pending as BigNumber).mul(price).div(WeiPerEther));
    }
  }, [pending, price]);

  return {pending, price, value, bestRoute};
}
