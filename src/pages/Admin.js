import { useState, useEffect } from 'react';
import { useWeb3Context } from '../contexts/Web3Context';
import Web3 from 'web3';

const Admin = () => {
    const { init, addAddressForAirDrop, checkAdmin, contract } = useWeb3Context();

    const [accountList, setAccountList] = useState([]);
    const [amountList, setAmountList] = useState([]);
    const [address, setAdress] = useState("");
    const [amount, setAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const [name, setName] = useState(null);
    const [symbol, setSymbol] = useState(null);
    const [initial, setInitial] = useState('0');
    const [max, setMax] = useState('0');

    const onWhitelistChange = e => setAdress(e.target.value);
    const onAmountChange = e => setAmount(e.target.value);
    const onwhitelistAddress = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        await init();
        if (await checkAdmin()) {
            addAddressForAirDrop(address, amount)
                .then(tx => {
                    console.log(tx.transactionHash);
                    loadWhiteList();
                })
                .catch(err => console.error(err));
        } else setErrorMessage("Only Admin of the contract can add address to whitelist");
    };
    const loadWhiteList = () => {
        if(contract) {
            Promise.all([
                contract.methods.getWhitelistedAddress().call(),
                contract.methods.getAllocatedAmount().call()
            ]).then(res => {
                setAmountList(res[1]);
                setAccountList(res[0]);
            })
            .catch(err => console.log(err));
        }
    }
    const loadTokenDetail = () => {
        if(contract) {
            Promise.all([
                contract.methods.name().call(),
                contract.methods.symbol().call(),
                contract.methods.totalSupply().call(),
                contract.methods.getMaxAirdropAmount().call()
            ]).then(res => {
                setName(res[0]);
                setSymbol(res[1]);
                setInitial(res[2]);
                setMax(res[3]);
            });
        }
    }
    useEffect(loadWhiteList, [contract]);
    useEffect(loadTokenDetail, [contract]);

    return (
        <div className='px-5 pt-10 flex'>
            <div className='flex-1'>
                <div className="m-4 mt-4 p-4 shadow-lg rounded-xl bg-gray-800 border-2 border-green-400">
                    <h1 className="text-xl font-semibold text-gray-300 text-center font-level common-color">For Admin Only</h1>
                    <form onSubmit={onwhitelistAddress}>
                        <div className="my-3">
                            <input
                                type="text"
                                name="address"
                                className="input input-bordered block w-full focus:ring focus:outline-none"
                                placeholder="Add Address"
                                onChange={onWhitelistChange}
                            />
                        </div>
                        <div className="my-3">
                            <input
                                type="number"
                                name="amount"
                                className="input input-bordered block w-full focus:ring focus:outline-none"
                                placeholder="Amount to transfer"
                                onChange={onAmountChange}
                            />
                        </div>
                        <div>
                            {errorMessage && (
                                <p className="error text-red-700 text-center font-bold">{" "}{errorMessage}{" "}</p>
                            )}
                        </div>
                        <footer className="py-4">
                            <button className="btn green-color submit-button focus:ring focus:outline-none w-full font-level">
                                Whitelist A Address
                            </button>
                        </footer>
                    </form>
                </div>
                <div className="m-4 mt-4 p-4 shadow-lg rounded-xl bg-gray-800 border-2 border-green-400">
                    <h1 className="text-xl font-semibold text-gray-300 text-center font-level common-color">Contract Details</h1>
                    <div className="card-text text-gray-300 flex flex-col gap-5 pt-3">
                        <div><span className='common-color font-bold'>Token Name:</span> {name}</div>
                        <div><span className='common-color font-bold'>Symbol:</span> {symbol}</div>
                        <div><span className='common-color font-bold'>Initial Supply:</span> {Web3.utils.fromWei(initial)} {symbol}</div>
                        <div><span className='common-color font-bold'>Max Airdrop:</span> {Web3.utils.fromWei(max)} {symbol}</div>
                    </div>
                </div>
            </div>
            <div className="m-4 mt-4 p-4 shadow-lg rounded-xl bg-gray-800 flex-1 border-2 border-green-400">
                <h1 className="text-xl font-semibold text-gray-300 text-center font-level common-color">Whitelist</h1>
                <div className="card-text text-gray-300 pt-3 flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: '456px' }}>
                    {
                        accountList.map((account, key) => (
                            <div key={key}><span className='font-bold'>{account}</span> ({Web3.utils.fromWei(amountList[key])})</div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Admin;