import {
	createContext,
	FC,
	useContext
} from 'react';

interface DebugLog {
	log: string;
	ts: Date;
}

interface IDebugContext {
	logs: DebugLog[];
	addLog: (l: string) => void;
}

const defaultState: IDebugContext = {
	logs: [],
	addLog: () => {}
};

const DebugContext = createContext<IDebugContext>(defaultState);

export const useDebug = () => useContext(DebugContext);

export const DebugProvider: FC = ({ children }) => {
	const logs: DebugLog[] = [];

	const addLog = (l: string) => {
		logs.push({log: l, ts: new Date()})
	};

	return (
		<DebugContext.Provider value={{logs, addLog}}>
			{children}
		</DebugContext.Provider>
	);
};
