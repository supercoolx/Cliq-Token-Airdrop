import { useState, useEffect, createContext, useContext } from 'react';
import Web3 from 'web3';
import WarptokenABI from "../abi/WarpToken.json";

export const context = createContext(null);
export const useWeb3Context = () => useContext(context);

const smartContractAddresses = "0x8D9c61255133E621982AaF99aA3515Bb52911962";
const adminAddress = "0xEb2C0650121D4918FF4b2fE05fc015b68A011108";

const Web3Provider = ({ children }) => {
    const [web3] = useState(new Web3(window.ethereum));
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
        setContract(new web3.eth.Contract(WarptokenABI, smartContractAddresses));
    }, [web3]);

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
            gasLimit: web3.utils.toHex(1000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei'))
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
                console.log('ds')
                flag = true;
                return await [flag, Web3.utils.fromWei(`${amountList[i]}`, "ether")];
            }
        }
    
        return await [flag, null];
    };

    const checkAdmin = async () => {
        if (!isInitialized) await init();
        return account.toLowerCase().localeCompare(adminAddress.toLowerCase()) === 0;
    };

    const addAddressForAirDrop = async (address, amount) => {
        if (!isInitialized) await init();
    
        return contract.methods.addAddressForAirDrop(address, Web3.utils.toWei(`${amount}`, "ether")).send({
            from: account,
            gasLimit: web3.utils.toHex(1000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei'))
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