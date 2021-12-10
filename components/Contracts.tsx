import * as React from 'react'
import {useEffect, useState} from 'react'
import ContractDetails from './ContractDetails';
import styled from 'styled-components';


const ContractsContainer = styled.div`
  display: flex;
`

const Contracts = () => {
  const [farms, setFarms] = useState<any[]>([]);

  useEffect(() => {
    console.log('fetch data');
    fetch('/api/data').then(res => res.json()).then(result => {
      setFarms(result);
    });
  }, []);

  // const {pending} = useFindFarms(SITES.panther);
  return <ContractsContainer>
    {farms.map((item) => (
      <ContractDetails key={item.id} farm={item}/>
    ))}
  </ContractsContainer>
}

export default Contracts
