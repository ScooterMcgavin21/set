
# Set
The project is bootstrapped with [`create-react-app`](https://github.com/facebook/create-react-app) and utilizes [set.js](https://github.com/SetProtocol/set.js) to fetch and display a list of Token Sets.

The appplication utilizes [Web3](https://web3.foundation/) and [MetaMask](https://metamask.io/) to interact with the Ethereum blockchain. MetaMask injects a global API through the <b>window.ethereum</b> Provider in order to handle asynchronous events.


**What does it do?**
<li> Connects to MetaMask or provides a link to download it
<li> Detects the Ethereum provider
<li> Prints the ethereum address 
<li> Displays the Chain ID of the Ethereum network the client is currently connected to
</li>

#

Dependencies
```
> git clone 
> npm install
> npm install --save @alch/alchemy-web3
> npm install web3
```

#

Run
```
npm start
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
