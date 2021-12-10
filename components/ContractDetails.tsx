import * as React from 'react';
import {Farm} from '../interfaces';
import {parseBalance} from '../utils';
import usePendingReward from '../hooks/usePendingReward';
import useHarvest from '../hooks/useHarvest';
import ActionButton from './ActionButton';
import ContractProperty from "./ContractProperty";
import VerticalSpacer from "./util/VerticalSpacer";
import Card from "./card/Card";
import CardTitle from "./card/CardTitle";
import CardContent from "./card/CardContent";

type Props = {
  farm: Farm
}

const ContractDetails = ({ farm }: Props) => {
  const { pending, value } = usePendingReward(farm);
  const { harvest } = useHarvest(farm);

  return <Card>
    <CardTitle>{farm.name}</CardTitle>
    <CardContent>
      <ContractProperty title="Pending" value={'$' + parseBalance(value ?? 0)}></ContractProperty>
      <VerticalSpacer size={10}></VerticalSpacer>
      <ActionButton onClick={ harvest } disabled={ pending == 0 }>Harvest</ActionButton>
    </CardContent>
  </Card>
}

export default ContractDetails
