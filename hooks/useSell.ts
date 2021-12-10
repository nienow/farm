import { Site } from '../interfaces';
import useContract from './useContract';
import { useCallback } from 'react';
import { useDebug } from '../providers/DebugProvider';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import {
	BigNumber,
	BigNumberish
} from 'ethers';
import { formatUnits } from '@ethersproject/units';
import useTokenPrice from './useTokenPrice';
import {WeiPerEther} from "@ethersproject/constants";

export default function useSell(site: Site, balance: BigNumberish) {
	const { addLog } = useDebug();
	const router = useContract(site.router, site.routerAbi);
	const { account } = useWeb3React<Web3Provider>();
	const { price, bestRoute } = useTokenPrice(site);

	const sellToken = useCallback(() => {
		if (router && price > 0 && balance > 0 && bestRoute) {
			const deadline = `0x${(Math.floor(new Date().getTime() / 1000) + 60 * 20).toString(16)}`
			const value = (balance as BigNumber).mul(price).div(WeiPerEther);
			const minOut = (value as BigNumber).mul(0.96);
			addLog('selling: ' + formatUnits(balance, 'ether') + ' for min: ' + formatUnits(minOut, 'ether'));
			return router.swapExactTokensForTokensSupportingFeeOnTransferTokens(balance, minOut, bestRoute, account, deadline);
		}
	}, [router, price, balance, bestRoute]);

	return { sellToken };
}
