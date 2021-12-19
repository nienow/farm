import * as React from 'react'
import ContractDetails from './ContractDetails';
import styled from 'styled-components';
import {MY_FARMS} from "../data/farms";


const ContractsContainer = styled.div`
  display: flex;
`

const Contracts = () => {
  // const [farms, setFarms] = useState<any[]>([]);

  // useEffect(() => {
  //   fetch('/api/data').then(res => res.json()).then(result => {
  //     setFarms(result);
  //   });
  // }, []);

  // const {pending} = useFindFarms(SITES.panther);
  return <ContractsContainer>
    {MY_FARMS.map((item) => (
      <ContractDetails key={item.id} farm={item}/>
    ))}
  </ContractsContainer>
}

export default Contracts
