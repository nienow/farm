import {useWeb3React} from '@web3-react/core';
import {useEffect} from 'react';
import {InjectedConnector} from '@web3-react/injected-connector';

export function useWalletConnect() {
	const { activate } = useWeb3React()
	const injected = new InjectedConnector({ supportedChainIds: [56] })

	useEffect(() => {
		injected.isAuthorized().then((isAuthorized: boolean) => {
			if (isAuthorized) {
				void activate(injected, undefined, true);
			}
		})
	}, []);
}
