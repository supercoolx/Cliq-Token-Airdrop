import background from '../assets/img/background.png';
import { useWeb3Context } from '../contexts/Web3Context';

const Dashboard = () => {
	const { init } = useWeb3Context();

	return (
		<div className='py-10'>
			<div className="credit-card w-full lg:w-3/4 sm:w-auto rounded-2xl border mx-auto bg-black shadow-md">
				<main>
					<div className="rounded-t-2xl green-color">
						<h1 className="text-2xl text-white p-3 text-center font-level">CLIQ Airdrop</h1>
					</div>
					<img src={background} className="w-full" height={300} alt="" />
					<button 
						type="button" 
						className="btn green-color focus:ring focus:outline-none w-full font-level"
						onClick={init}
					>
						CONNECT WALLET
					</button>
				</main>
			</div>
		</div>
	)
}

export default Dashboard;