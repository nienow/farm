import pantherChefAbi from '../contracts/panther.chef.json';
import pantherRouterAbi from '../contracts/panther.router.json';
import { Site } from '../interfaces';

export const SITES: {[key: string]: Site} = {
	panther: {
		name: 'PantherSwap',
		chef: '0x058451c62b96c594ad984370eda8b6fd7197bbd4',
		chefAbi: pantherChefAbi,
		token: '0x1f546ad641b56b86fd9dceac473d1c7a357276b7',
		router: '0x24f7C33ae5f77e2A9ECeed7EA858B4ca2fa1B7eC',
		routerAbi: pantherRouterAbi,
		referral: true
	}
}
