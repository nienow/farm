import * as React from 'react'
import {
  Farm
} from '../interfaces';
import ContractDetails from './ContractDetails';

type Props = {
  items: Farm[]
}

const Contracts = ({ items }: Props) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        <ContractDetails farm={item} />
      </li>
    ))}
  </ul>
)

export default Contracts
