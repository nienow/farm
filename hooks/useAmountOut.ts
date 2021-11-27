import useSWR from 'swr';
import { ContractAddress } from '../interfaces';
import {
  BigNumberish,
  Contract
} from 'ethers';
import { parseEther } from '@ethersproject/units';

const oneEther = parseEther('1');
console.log(oneEther);

function getAmountOut(contract: Contract) {
  return (...route: string[]) => {
    return contract.getAmountsOut(oneEther, route).then((result: BigNumberish[]) => result[result.length - 1]);
  };
}

export default function useAmountOut(
  router: Contract,
  route: ContractAddress[]
) {
  const result = useSWR(
    router ? route: null,
    getAmountOut(router)
  );
  return { amount: result.data };
}
