import { BigNumberish } from 'ethers';
import { formatUnits } from '@ethersproject/units';

export const parseBalance = (
	value: BigNumberish,
	decimals = 18,
	decimalsToDisplay = 0
) => parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay);
