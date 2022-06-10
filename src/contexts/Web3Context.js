import { useState, useEffect, createContext, useContext } from 'react';
import Web3 from 'web3';
import CliqToken from "../abi/CliqToken.json";

export const context = createContext(null);
export const useWeb3Context = () => useContext(context);

const smartContractAddresses = "0xcDEB45F3284CBB98B8fE77268E347863bAc99C61";

const Web3Provider = ({ children }) => {
    const [web3] = useState(new Web3(window.ethereum));
    const [admin, setAdmin] = useState('');
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [isInitialized, setInitialized] = useState(false);

    useEffect(() => {
        if (web3.currentProvider) {
            web3.currentProvider.on("accountChange", accounts => {
                setAccount(accounts[0]);
                setInitialized(true);
            });
        }
        setContract(new web3.eth.Contract(CliqToken.abi, smartContractAddresses));
    }, [web3]);

    useEffect(() => {
        if(contract) {
            contract.methods.getAdmin().call().then(res => setAdmin(res));
        }
    }, [contract])

    const init = () => {
        web3.eth.requestAccounts()
            .then(accounts => {
                setAccount(accounts[0]);
                setInitialized(true);
            })
            .catch(err => console.log(err));
    }

    const claimToken = async () => {
        if (!isInitialized) await init();
        return contract.methods.claimToken(account).send({
            from: account,
            gasLimit: Web3.utils.toHex(1000000),
            gasPrice: Web3.utils.toHex(Web3.utils.toWei('30', 'gwei'))
        });
    };

    const isProcessed = async () => {
        if (!isInitialized) await init();
        return await contract.methods.getProcessedAirdrop(account).call();
    };

    const isWhitelisted = async () => {
        if (!isInitialized) await init();

        let [accountList, amountList] = await Promise.all([
            contract.methods.getWhitelistedAddress().call(),
            contract.methods.getAllocatedAmount().call()
        ]);
    
        let flag = false, i;
        for (i = 0; i < accountList.length; i++) {
            if ( accountList[i].toLowerCase().localeCompare(account.toLowerCase()) === 0 ) {
                flag = true;
                return await [flag, Web3.utils.fromWei(`${amountList[i]}`, "ether")];
            }
        }
    
        return await [flag, null];
    };

    const checkAdmin = async () => {
        if (!isInitialized) await init();
        return account.toLowerCase().localeCompare(admin.toLowerCase()) === 0;
    };

    const addAddressForAirDrop = async (address, amount) => {
        if (!isInitialized) await init();
    
        return contract.methods.addAddressForAirDrop(address, Web3.utils.toWei(`${amount}`, "ether")).send({
            from: account,
            gasLimit: Web3.utils.toHex(1000000),
            gasPrice: Web3.utils.toHex(Web3.utils.toWei('30', 'gwei'))
        });
    };

    return (
        <context.Provider value={{
            isInitialized,
            contract,
            init,
            claimToken,
            isProcessed,
            isWhitelisted,
            checkAdmin,
            addAddressForAirDrop
        }}>
            {children}
        </context.Provider>
    )
};

export default Web3Provider;