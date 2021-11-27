import * as React from 'react';
import { Site } from '../interfaces';
import styled from 'styled-components';
import useTokenPrice from '../hooks/useTokenPrice';
import { parseBalance } from '../utils';
import ActionButton from './ActionButton';
import useWalletValue from '../hooks/useWalletValue';
import useSell from '../hooks/useSell';

type Props = {
  site: Site
}

const SiteContainer = styled.div`
  border: 1px solid #222;
  margin: 10px;
  width: 200px;
`

const SiteTitle = styled.div`
  font-size: 20px;
  text-align: center;
  background-color: #222;
  color: white;
  padding: 10px 0;
`

const SiteContent = styled.div`
  padding: 10px;
`

const SiteDetails = ({ site }: Props) => {
  const { price } = useTokenPrice(site);
  const { balance, value: walletValue } = useWalletValue(site);
  const { sellToken } = useSell(site, balance);

  return <SiteContainer>
    <SiteTitle>{site.name}</SiteTitle>
    <SiteContent>
      <div>Price: ${parseBalance(price ?? 0)}</div>
      <div>Wallet: ${parseBalance(walletValue ?? 0)}</div>
      <ActionButton onClick={ sellToken } disabled={balance == 0}>Sell</ActionButton>
    </SiteContent>
  </SiteContainer>
}

export default SiteDetails
