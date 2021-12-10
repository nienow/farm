import useSWR from 'swr';
import {ContractAddress} from '../interfaces';
import {BigNumberish, Contract} from 'ethers';
import {WeiPerEther} from "@ethersproject/constants";

function getAmountOut(contract: Contract) {
  return (...route: string[]) => {
    return contract.getAmountsOut(WeiPerEther, route).then((result: BigNumberish[]) => result[result.length - 1]);
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
