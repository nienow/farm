import * as React from 'react';
import {Site} from '../interfaces';
import styled from 'styled-components';
import useTokenPrice from '../hooks/useTokenPrice';
import {parseBalance} from '../utils';
import ActionButton from './ActionButton';
import useWalletValue from '../hooks/useWalletValue';
import useSell from '../hooks/useSell';
import ContractProperty from "./ContractProperty";
import VerticalSpacer from "./util/VerticalSpacer";
import Card from "./card/Card";
import CardTitle from "./card/CardTitle";
import CardContent from "./card/CardContent";

type Props = {
	site: Site
}

const SiteDetails = ({site}: Props) => {
	const {price} = useTokenPrice(site);
	const {balance, value: walletValue} = useWalletValue(site);
	const {sellToken} = useSell(site, balance);

	return <Card>
		<CardTitle>{site.name}</CardTitle>
		<CardContent>
			<ContractProperty title="Price" value={'$' + parseBalance(price ?? 0)}></ContractProperty>
			<ContractProperty title="Wallet" value={'$' + parseBalance(walletValue ?? 0)}></ContractProperty>
			<VerticalSpacer size={10}></VerticalSpacer>
			<ActionButton onClick={sellToken} disabled={balance == 0}>Sell</ActionButton>
		</CardContent>
	</Card>
}

export default SiteDetails
