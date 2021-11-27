import { Site } from '../interfaces';
import useContract from './useContract';
import useAmountOut from './useAmountOut';
import { TOKENS } from '../data/tokens';
import {
  useEffect,
  useState
} from 'react';
import { BigNumberish } from 'ethers';
import { useDebug } from '../providers/DebugProvider';

export default function useTokenPrice(
  site: Site
) {
  const router = useContract(site.router, site.routerAbi);
  const [price, setPrice] = useState<BigNumberish>(0);
  const [bestRoute, setBestRoute] = useState<string[]>([]);
  const { addLog } = useDebug();

  const busdRoute = [
    site.token,
    TOKENS.BUSD
  ];
  const bnbRoute = [
    site.token,
    TOKENS.WBNB,
    TOKENS.BUSD
  ];

  const { amount: busdValue } = useAmountOut(router, busdRoute);
  const { amount: bnbValue } = useAmountOut(router, busdRoute);

  useEffect(() => {
    if (busdValue && bnbValue) {
      if (busdValue.gte(bnbValue)) {
        setBestRoute(busdRoute);
        setPrice(busdValue);
        addLog('using busd value: ' + busdValue);
      } else {
        setBestRoute(bnbRoute);
        setPrice(bnbValue);
        addLog('using bnb value: ' + bnbValue);
      }
    }
  }, [busdValue, bnbValue]);

  return { price, bestRoute };
}
