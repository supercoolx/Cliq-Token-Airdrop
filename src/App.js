import { useState, useEffect } from 'react';
import Admin from "./pages/Admin";
import Client from "./pages/Client";
import Dashboard from './pages/Dashboard';
import { useWeb3Context } from './contexts/Web3Context';

const App = () => {
	const { isInitialized, checkAdmin } = useWeb3Context();
	const [DOM, setDOM] = useState(<div />);

	useEffect(() => {
		if(isInitialized) {
			checkAdmin().then(isAdmin => {
				isAdmin ? setDOM(<Admin />) : setDOM(<Client />);
			});
		}
		else setDOM(<Dashboard />);
	}, [isInitialized, checkAdmin]);

	return DOM;
}

export default App;