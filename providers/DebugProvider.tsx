import {
	createContext,
	FC,
	useContext,
	useReducer
} from 'react';

interface DebugLog {
	log: string;
	ts: Date;
}

interface IDebugContext {
	logs: DebugLog[];
	addLog: (l: string) => void;
}

const DebugContext = createContext<IDebugContext>({
	logs: [],
	addLog: () => {}
});

export const useDebug = () => useContext(DebugContext);

export const DebugProvider: FC = ({ children }) => {
	const [ logs, addLog ] = useReducer(
		(logs, newLog) => ([{log: newLog, ts: new Date()}, ...logs]),
		[]
	)

	return (
		<DebugContext.Provider value={{ logs, addLog }}>
			{children}
		</DebugContext.Provider>
	);
};
