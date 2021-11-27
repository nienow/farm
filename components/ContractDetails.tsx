import * as React from 'react';
import { Farm } from '../interfaces';
import { parseBalance } from '../utils';
import usePendingReward from '../hooks/usePendingReward';
import useHarvest from '../hooks/useHarvest';
import styled from 'styled-components';
import ActionButton from './ActionButton';

type Props = {
  farm: Farm
}

const ContractContainer = styled.div`
  border: 1px solid #222;
  margin: 10px;
  width: 200px;
`

const ContractTitle = styled.div`
  font-size: 20px;
  text-align: center;
  background-color: #222;
  color: white;
  padding: 10px 0;
`

const ContractContent = styled.div`
  padding: 10px;
`

const ContractDetails = ({ farm }: Props) => {
  const { pending, value } = usePendingReward(farm);

  const { harvest } = useHarvest(farm);



  return <ContractContainer>
    <ContractTitle>{farm.name}</ContractTitle>
    <ContractContent>
      <div>Pending: ${parseBalance(value ?? 0)}</div>
      <ActionButton onClick={ harvest } disabled={ pending == 0 }>Harvest</ActionButton>
    </ContractContent>
  </ContractContainer>
}

export default ContractDetails
