import * as React from 'react'
import {
  Farm
} from '../interfaces';
import ContractDetails from './ContractDetails';
import styled from 'styled-components';

type Props = {
  items: Farm[]
}

const ContractsContainer = styled.div`
  display: flex;
`

const Contracts = ({ items }: Props) => (
  <ContractsContainer>
    {items.map((item) => (
      <ContractDetails key={item.id} farm={item} />
    ))}
  </ContractsContainer>
)

export default Contracts
