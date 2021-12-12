import { useEffect, useState } from 'react';
import Web3 from 'web3';
import Home from './components/Home/Home';
import Posts from './components/Posts/Posts';
import Wallet from './components/Wallet/Wallet';
/**
 * App initalizes hooks and web3
 * Login button is shown when not connected,
 * and when the user sucessffuly connects to metamask, 
 * isconnected sets true and returns the users account address and balance
 */
function App() {
  // Display either the Home or Wallet Component. Wallet displays when not connected, Home displays when connected
  const [isConnected, setIsConnected] = useState(false);
  // set the currently connected account set to null by default 
  const [currentAccount, setCurrentAccount] = useState(null);
  // state for changing network
  const [chainId, setChainId] = useState(null);
  // provider state
  const [provider, setProvider] = useState(window.ethereum);
  // web3 state
  const [web3, setWeb3] = useState(null);

  /** 
   * Network mapping chainIds from metamask docs
   */
  const NETWORKS = {
    1: "Ethereum Main Network",
    3: "Ropsten Test Network",
    4: "Rinkeby Test Network",
    5: "Goerli Test Network",
    42: "Kovan Test Network",
  };
  /**
   * methods for connecting onLogin() & disconnecting onLogout()
   * provider passed in from Wallet.js to to fetch metamask account with web3 lib 
   * accounts[0] provides a single account but the array gives room to grow
   */
  const onLogin = async (provider) => {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const chainId = await web3.eth.getChainId();
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask');
    } else if (accounts[0] !== currentAccount) {
      setProvider(provider);
      setWeb3(web3);
      setChainId(chainId);
      setCurrentAccount(accounts[0]);
      setIsConnected(true);
    }
  };

  /**
   * Want effect to be triggered when disconnect state changes
   * providers listening, register to the two events:
   * - accounts change
   * - chain change event
   */
  useEffect(() => {
    // accounts cchanged calledback 
    const handleAccountsChanged = async (accounts) => {
      const web3Accounts = await web3.eth.getAccounts();
      // if contract = 0 can logout
      if (accounts.length === 0) {
        onLogout();
      } else if (accounts[0] !== currentAccount) {
        setCurrentAccount(accounts[0]);
      }
    };
    
    // change network callback 
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
    // cleanup function 
    return () => {
      if (isConnected) {
        provider.removeListener('accountsChanged', handleAccountsChanged);
        provider.removeListener('chainChanged', handleChainChanged);
      }
    }
  }, [isConnected]);

  // when logged out, setstate to null to prevent the address displaying in the nav
  const onLogout = () => {
    setIsConnected(false);
    setCurrentAccount(null);  // prevents account from showing in the top right of the nav
  }

  /**
   * GetNetwork function 
   * returns the obj value Of What current Ethereum node we're running on
   */
  const getCurrentNetwork = (chainId) => {
    return NETWORKS[chainId];
  }

  return (
    <div>
      <header className="main-header">
        <h1>Set Protocol</h1>
        <nav className='nav'>
          <ul>
            <li>
              <a href='/'>Running On: {getCurrentNetwork(chainId)}</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {!isConnected && <Wallet onLogin={onLogin} onLogout={onLogout} />}
        {isConnected && (<Home currentAccount={currentAccount} currentNetwork={getCurrentNetwork(chainId)} />)}
        <Posts />
      </main>
    </div>
  );
}

export default App;

