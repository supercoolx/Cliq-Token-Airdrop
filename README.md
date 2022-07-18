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
