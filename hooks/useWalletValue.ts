import useTokenContract from './useTokenContract';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import useTokenPrice from './useTokenPrice';
import {
  useEffect,
  useState
} from 'react';
import {
  BigNumber,
  BigNumberish
} from 'ethers';
import { Site } from '../interfaces';

export default function useWalletValue(
  site: Site
) {
  const contract = useTokenContract(site.token);
  const { account } = useWeb3React<Web3Provider>();
  const { price } = useTokenPrice(site);
  const [ balance, setBalance ] = useState<BigNumberish>(0);
  const [ value, setValue ] = useState<BigNumberish>(0);

  useEffect(() => {
    if (contract && account) {
      contract.balanceOf(account).then((balance: BigNumberish) => {
        setBalance(balance);
      });
    }
  }, [contract, account]);

  useEffect(() => {
    if (balance && price) {
      setValue((balance as BigNumber).mul(price).div(BigNumber.from('1000000000000000000')));
    }
  }, [balance, price]);

  return {balance, value};
}
