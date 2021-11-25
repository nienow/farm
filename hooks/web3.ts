import Web3 from 'web3';
import { HttpProviderOptions } from 'web3-core-helpers';
import React, {
	useEffect
} from 'react';

const httpProvider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org', { timeout: 10000 } as HttpProviderOptions)

export function useWeb3() {
	const [web3, setweb3] = React.useState<Web3>();

	useEffect(() => {
		if (typeof window !== "undefined") {
			console.log('init web3');
			const { ethereum } = window as any;
			setweb3(new Web3(ethereum || httpProvider))
		}
	});

	return web3
}
