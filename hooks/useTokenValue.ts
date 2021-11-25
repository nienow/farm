import { Farm } from '../interfaces';
import useContract from './useContract';
import { SITES } from '../data/sites';
import useAmountOut from './useAmountOut';
import { TOKENS } from '../data/tokens';
import {
  useEffect,
  useState
} from 'react';

export default function useTokenValue(
  farm: Farm
) {
  const site = SITES[farm.site];
  const router = useContract(site.router, site.routerAbi);
  const [value, setValue] = useState(0);
  const [bestRoute, setBestRoute] = useState<string[]>([]);

  const busdRoute = [
    site.token,
    TOKENS.BUSD
  ];
  const bnbRoute = [
    site.token,
    TOKENS.WBNB,
    TOKENS.BUSD
  ];

  if (router) {
    const busdValue = useAmountOut(router, busdRoute);
    const bnbValue = useAmountOut(router, busdRoute);

    useEffect(() => {
      if (busdValue && bnbValue) {
        if (busdValue > bnbValue) {
          setBestRoute(busdRoute);
          setValue(busdValue);
        } else {
          setBestRoute(bnbRoute);
          setValue(bnbValue);
        }
      }
    }, [busdValue, bnbValue]);
  }

  return { value, bestRoute };
}
