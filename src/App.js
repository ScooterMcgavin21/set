import { useState } from "react";
import Web3 from "web3";
import Home from "./components/Home/Home";
import Posts from "./components/Posts/Posts";
import Wallet from "./components/Wallet/Wallet";
/**
 * App initalizes hooks and web3
 * Login button is shown when not connected,
 * and when the user sucessffuly connects to metamask, 
 * isconnected sets true and returns the users account address and balance
 */
function App() {

  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [balance, setBalance] = useState(0);

  /**
   * provider passed from wallet to set account 
   * Then passed down to the header and home component
   */
  const onLogin = async (provider) => {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask!");
    } else if (accounts[0] !== currentAccount) {
      setCurrentAccount(accounts[0]);
      const accBalanceEth = web3.utils.fromWei(
        await web3.eth.getBalance(accounts[0]),
        "ether"
      );

      //setBalance(Number(accBalanceEth).toFixed(6));
      setIsConnected(true);
    }
  };

  const onLogout = () => {
    setIsConnected(false);
  };

  return (
    <div>
      <header className="main-header">
        <h1>Set Protocol</h1>
        <nav className="nav">
          <ul>
            <li>
              <a href="/">{currentAccount}</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {!isConnected && <Wallet onLogin={onLogin} onLogout={onLogout} />}
        {isConnected && (
          <Home currentAccount={currentAccount} balance={balance} />
        )}
      </main>
      <Posts />
    </div>
  );
}

export default App;
