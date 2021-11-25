import useSWR from "swr";
import useTokenContract from "./useTokenContract";
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

function getTokenBalance(contract: any) {
  return async (_: string, address: string) => {
    const balance = await contract.balanceOf(address);

    return balance;
  };
}

export default function useTokenBalance(
  tokenAddress: string
) {
  const contract = useTokenContract(tokenAddress);
  const { account } = useWeb3React<Web3Provider>();

  const shouldFetch =
    typeof account === "string" &&
    typeof tokenAddress === "string" &&
    !!contract;

  const result = useSWR(
    shouldFetch ? ["TokenBalance", account, tokenAddress] : null,
    getTokenBalance(contract)
  );

  // useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return {balance: result.data};
}
