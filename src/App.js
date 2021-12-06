import { useEffect, useState } from "react";
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
  const [provider, setProvider] = useState(window.ethereum);
  const [chainId, setChainId] = useState(null);
  const [web3, setWeb3] = useState(null);

  /**
   * provider passed from wallet to set account 
   * Then passed down to the header and home component
   */
  const onLogin = async (provider) => {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const chainId = await web3.eth.getChainId();
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask!");
    } else if (accounts[0] !== currentAccount) {
      setProvider(provider);
      setWeb3(web3);
      setChainId(chainId);
      setCurrentAccount(accounts[0]);
      setIsConnected(true);
    }
  };

  // only want hook to trigger when isConnected state changes
  // account change event and chain change event
  useEffect(() => {
    const handleAccountsChanged = async (accounts) => {
      const web3Accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        onLogout();
      } else if (accounts[0] !== currentAccount) {
        setCurrentAccount(accounts[0]);
      }
    };

    // handle case when you change network
    const handleChainChanged = async (chainId) => {
      const web3ChainId = await web3.eth.getChainId();
      setChainId(web3ChainId);
    };
    if(isConnected) {
      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (isConnected){
        provider.removeListener('accountsChanged', handleAccountsChanged);
        provider.removeListener('chainChanged', handleChainChanged);
      }
    };

  }, [isConnected]);
  

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
          <Home currentAccount={currentAccount} currentNetwork={chainId} />
        )}
      </main>
      <Posts />
    </div>
  );
}

export default App;
