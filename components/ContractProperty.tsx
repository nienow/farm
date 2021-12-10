import * as React from 'react';
import styled from "styled-components";

type Props = {
  title: string;
  value: any;
}

const ContractPropertyContainer = styled.div`
  display: flex;
`

const Title = styled.div`
  flex: 1 1 auto;
`

const Value = styled.div`
  flex: 1 1 auto;
  text-align: right;
`

const ContractProperty = ({ title, value }: Props) => (
  <ContractPropertyContainer>
    <Title>{title}</Title>
    <Value>{value}</Value>
  </ContractPropertyContainer>
)

export default ContractProperty
