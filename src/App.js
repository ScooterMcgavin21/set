import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import Home from './components/Home';
import Posts from './components/Posts';
import './styles/App.css';
/**
 * Web3 Provider function 
 * Detects whether the user is using MetaMask 
 * or Ethereum wallet-enabled browser. 
 * If not, it will access the Ethereum network 
 * through a given Web3 fallback provider (e.g. INFURA node).
 */
function getLibrary(provider) {
  return new Web3(provider)
}
/**
 * App function Which renders the Posts Component
 */
function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Home />
      <Posts />
      
    </Web3ReactProvider>
  );
}

export default App;
