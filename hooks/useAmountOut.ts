import useSWR from 'swr';
import { ContractAddress } from '../interfaces';
import {
  BigNumberish,
  Contract
} from 'ethers';

function getAmountOut(contract: any) {
  return (...route: string[]) => {
    return contract.getAmountsOut(1, route).then((result: BigNumberish[]) => result[result.length - 1]);
  };
}

export default function useAmountOut(
  router: Contract,
  route: ContractAddress[]
) {
  const result = useSWR(
    route,
    getAmountOut(router)
  );
  return result.data;
}
