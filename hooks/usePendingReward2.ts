import { Farm } from '../interfaces';
import useContract from './useContract';
import { SITES } from '../data/sites';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { BigNumberish } from 'ethers';
import { TOKENS } from '../data/tokens';
import {
  useEffect,
  useState
} from 'react';
import { useDebug } from '../providers/DebugProvider';

export default function usePendingReward2(
  farm: Farm
) {
  const site = SITES[farm.site];
  const chef = useContract(site.chef, site.chefAbi);
  const router = useContract(site.router, site.routerAbi);
  const { account } = useWeb3React<Web3Provider>();
  const [pending, setPending] = useState<BigNumberish>(0);
  const [value, setValue] = useState(0);
  const [bestRoute, setBestRoute] = useState<string[]>([]);
  const { addLog } = useDebug();

  useEffect(() => {
    if (chef && router) {
      addLog('fetching pending for ' + farm.pid);
      chef.pendingPanther(farm.pid, account).then((balance: BigNumberish) => {
        // setPending(parseFloat(formatUnits(value, 18)).toFixed(0));
        setPending(balance);
        if (balance > 0) {
          const busdRoute = [
            site.token,
            TOKENS.BUSD
          ];
          const bnbRoute = [
            site.token,
            TOKENS.WBNB,
            TOKENS.BUSD
          ];
          const busdProimise = router.getAmountsOut(balance, busdRoute);
          const bnbPromise = router.getAmountsOut(balance, bnbRoute);
          Promise.all([
            busdProimise,
            bnbPromise
          ]).then(results => {
            const busdValue = results[0][1];
            const bnbValue = results[1][2];
            if (busdValue > bnbValue) {
              setBestRoute(busdRoute);
              setValue(busdValue);
            } else {
              setBestRoute(bnbRoute);
              setValue(bnbValue);
            }
          });
        }
      });
    }
  }, [chef, router]);

  return {pending, value, bestRoute};
}
