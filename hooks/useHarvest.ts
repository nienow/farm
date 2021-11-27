import { Farm } from '../interfaces';
import { SITES } from '../data/sites';
import useContract from './useContract';
import { useCallback } from 'react';
import { useDebug } from '../providers/DebugProvider';

export default function useHarvest(farm: Farm) {
	const { addLog } = useDebug();
	const site = SITES[farm.site];
	const chef = useContract(site.chef, site.chefAbi);

	const harvest = useCallback(() => {
		if ( chef) {
			let harvestPromise;
			if (site.referral) {
				harvestPromise = chef.deposit(farm.pid, '0', '0x0000000000000000000000000000000000000000');
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