import * as React from 'react';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';

const AccountDetails = () => {
	const { account } = useWeb3React()

	const [address, setAddress] = React.useState('')

	useEffect(() => {
		if (account) {
			setAddress(account);
		}
	}, [account]);

	return (
			<div>Address = {address}</div>
	)
}

export default AccountDetails
