import {SITES} from '../data/sites';
import useContract from './useContract';
import {useCallback} from 'react';
import {useDebug} from '../providers/DebugProvider';
import {AddressZero} from "@ethersproject/constants";

export default function useHarvest(farm: any) {
	const { addLog } = useDebug();
	const site = SITES[farm.site];
	const chef = useContract(site.chef, site.chefAbi);

	const harvest = useCallback(() => {
		if ( chef) {
			let harvestPromise;
			if (site.referralRate) {
				harvestPromise = chef.deposit(farm.pid, '0', AddressZero);
			} else {
				harvestPromise = chef.deposit(farm.pid, '0');
			}
			return harvestPromise.then(() => {
				addLog('Harvested: ' + site.name + ' - ' + farm.pid);
			});
		}
	}, [chef]);

	return { harvest };
}
