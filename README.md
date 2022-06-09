## Smart Contract:

- **Token Name:** CLIQ Token
- **Symbol:** CLIQ
- **Initial Supply:** 876000000CLIQ
- **Deployed Network:**</br>


## Features:

- Can Airdrop the token to whitelisted accounts.
- Max token available airdrop is 876000000 CLIQ (15% of the initial supply)
- Current available token for airdrop 131400000 CLIQ.
- Only admin can add address and amount to the whitelist.
- User should interact with the front-end and claim the token by paying the gas fee.
- User should input the amount of ATN to claim. It should match the allotted amount by the admin.
- Admin can add new address and amount to the whitelist through the front-end.
- A whitelisted account can only claim the airdrop once.
- Front-end will extract the address from the metamask automatically for all the calculation.
- Currently the whitelist address and respective amount are being stored in a array inside the smart contract.

## Front-end Features:

- Accept amount as input for airdrop
- Admin can whitelist a address and allot a specific amount for the address to airdrop
- It can verify whether the user address is in the whitelisted address or not.
- It can verify whether the user address has already got the airdrop or not.
- It can verify whether the user has entered the allotted amount or not, if not it will display the allotted amount
to the respective user if their address is whitelisted.
- If above 3 condition are satisfied it will start processing the airdrop by asking for user account signature.
- After successful transaction, the app will show the transaction hash along with a link to Ropsten etherscan
website.

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
