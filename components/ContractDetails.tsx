import * as React from 'react';
import { Farm } from '../interfaces';
import { SITES } from '../data/sites';
import useContract from '../hooks/useContract';
import { parseBalance } from '../utils';
import useTokenBalance from '../hooks/useTokenBalance';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useDebug } from '../providers/DebugProvider';
import usePendingReward2 from '../hooks/usePendingReward2';

type Props = {
  farm: Farm
}

const ContractDetails = ({ farm }: Props) => {
  const site = SITES[farm.site];
  const chef = useContract(site.chef, site.chefAbi);
  const router = useContract(site.router, site.routerAbi);
  const { pending, value, bestRoute } = usePendingReward2(farm);
  const { balance } = useTokenBalance(site.token);
  const { account } = useWeb3React<Web3Provider>();
  const { addLog } = useDebug();

  function harvest() {
    if (chef) {
      chef.deposit(farm.pid, '0', '0x0000000000000000000000000000000000000000');
      addLog('Harvest');
    }
  }

  function sell() {
    if (router && bestRoute) {
      const deadline = `0x${(Math.floor(new Date().getTime() / 1000) + 60 * 20).toString(16)}`
      const minOut = value * 0.96;
      router.swapExactTokensForTokensSupportingFeeOnTransferTokens(balance, minOut, bestRoute, account, deadline);
      addLog('Sell');
    }
  }

  return <div>
    <h1>{farm.name}</h1>
    <div>Pending: {parseBalance(pending ?? 0)}</div>
    <div>Pending Value: {parseBalance(value ?? 0)}</div>
    <button onClick={harvest}>Harvest</button>
    <div>Wallet: {parseBalance(balance ?? 0)}</div>
    <button onClick={sell}>Sell</button>
  </div>
}

export default ContractDetails
