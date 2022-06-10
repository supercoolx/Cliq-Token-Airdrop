import { useState } from 'react';
import { useWeb3Context } from '../contexts/Web3Context';
import background from '../assets/img/background.png';

const Client = () => {
    const { init, claimToken, isWhitelisted, isProcessed } = useWeb3Context();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
        text: "",
        color: "",
        txLink: "",
    });
    const claim = async (e) => {
        let transactionHash;
        await init();
        setMessage({
            text: "",
            color: "",
            txLink: "",
        });

        setLoading(true);

        let whiteListCheck = await isWhitelisted();

        if (!whiteListCheck[0]) {
            console.log("This address is not whitelisted");
            setLoading(false);
            setMessage({
                text: "Your address is not whitelisted for the airdrop",
                color: "red",
            });
        } else if (await isProcessed()) {
            setLoading(false);
            console.log("This address has already claimed the airdrop");
            setMessage({
                text: "Your address has already claimed the airdrop",
                color: "green",
            });
        } else {
            await claimToken()
                .then((tx) => {
                    console.log(tx);
                    transactionHash = tx.transactionHash;
                })
                .catch((err) => {
                    console.error(err);
                });

            setLoading(false);

            setMessage({
                text: `Yey, Airdrop Completed. Check the transaction at`,
                txLink: `https://mumbai.polygonscan.com/tx/${transactionHash.toLowerCase()}`,
                color: "blue",
            });
        }
    };

    return (
        <div className='py-5'>
            <div className="credit-card w-full lg:w-3/4 sm:w-auto shadow-lg border-2 border-green-400 mx-auto rounded-xl bg-gray-800">
                <main className="p-4">
                    <h1 className="text-2xl font-bold text-gray-300 text-center font-level common-color">
                        CLIQ Token Airdrop
                    </h1>
                    <img src={background} className="w-full py-5" height={300} alt="" />
                    <h5 className="card-title text-gray-300">
                        How to claim your tokens?
                    </h5>
                    <div className="card-text text-gray-300">
                        <ul>
                            <li>
                                <span className='common-color font-bold'>Step 1: </span> Make sure you have some MATIC to pay for
                                transaction fees.
                            </li>
                            <br />
                            <li>
                                <span className='common-color font-bold'>Step 2: </span>Enter your wallet address and click on submit.
                                This will check if you are eligible for the airdrop or not
                            </li>
                            <br />
                            <li>
                                <span className='common-color font-bold'>Step 3: </span> Confirm the transaction to claim your CLIQ
                                tokens. This will send a transaction to the Airdrop smart
                                contract
                            </li>
                            <br />
                        </ul>
                    </div>
                    <div className="">
                        {loading ? (
                            <p className="card-text text-green-400 text-center font-bold">
                                Processing....
                            </p>
                        ) : null}
                        {message.text && (
                            <p
                                className={
                                    "error text-" +
                                    message.color +
                                    "-400 text-center font-bold"
                                }
                            >
                                {" "}
                                {message.text}{" "}
                            </p>
                        )}
                        {message.txLink && (
                            <a
                                href={message.txLink}
                                className={
                                    "error text-" +
                                    message.color +
                                    "-700 text-center font-bold"
                                }
                                style={{ whiteSpace: "pre" }}
                            >
                                {" "}
                                {message.txLink}{" "}
                            </a>
                        )}
                    </div>
                </main>
                <footer className="p-4">
                    <button onClick={claim} className="btn green-color submit-button focus:ring focus:outline-none w-full font-level">
                        Claim Airdrop
                    </button>
                </footer>
            </div>
        </div>
    )
}

export default Client;