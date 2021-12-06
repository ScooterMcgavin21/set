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

  /** Maping Chain Ids */
  const NETWORKS = {
    1: 'Ethereum Main Network',
    3: 'Ropsten Test Network',
    4: 'Rinkeby Test Network',
    5: 'goerli Test Network',
    42: 'Kovan Test Network'
  };

  /**
   * provider passed from wallet to set account 
   * Then passed down to the header and home component
   */
  const onLogin = async (provider) => {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const chainId = await web3.eth.getChainId();
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask!');
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
    /** Chain Id pf EVM networks:
     * Decimal        hex   
     * [1] - mainnet  [0x1]     
     * [3] - ropsten  [0x3]
     * [4] - rinkeby  [0x4]
     * [5] - goerli   [0x5]
     * [42] - kovan   [0x2a]
     * 
     */
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
  
  // when logged out, setstate to null to prevent the address displaying in the nav
  const onLogout = () => {
    setIsConnected(false);
    setCurrentAccount(null);
  };

  // return the obj value Of What current Ethereum node we're running on
  const getNetwork = (chainId) => {
    return NETWORKS[chainId];
  }

  return (
    <div>
      <header className='main-header'>
        <h1>Set Protocol</h1>
        <nav className="nav">
          <ul>
            <li>
              <a href="/">[{currentAccount}] Running On: [{getNetwork(chainId)}]</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {!isConnected && 
          <Wallet 
            onLogin={onLogin} 
            onLogout={onLogout} 
          />
        }
        {isConnected && (
          <Home 
            currentAccount={currentAccount} 
            currentNetwork={getNetwork(chainId)} 
          />
        )}
      </main>
      <Posts />
    </div>
  );
}

export default App;
