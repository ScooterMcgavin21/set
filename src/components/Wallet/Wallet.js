import React, { useEffect, useState } from 'react';
import Card from '../UI/Card/Card';
import classes from './Wallet.module.css';

/**
 * Detect provider when page is loading to give feedback to user when needed
 * ex: if no provider is detected, display a message to install metamask and connect btn is not avilable
 */

/**
 * Renders the reusable Card component which displays the btn component to connect to metamask
 */
function Wallet(props) {
  // Create state to determine if trying to connect to display a loading message to the user when btn is clicked
  const [isConnecting, setIsConnecting] = useState(false);
  // iniatlzie state to the provider we expect, window.ethereum
  const [provider, setProvider] = useState(window.ethereum);
  // state to let user know if metamask is installed 
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  /**
   * useEffect that runs only once [] which initalizes the provider from detectProvider function
   */
  useEffect(() => {
    setProvider(detectProvider());
  }, [])

  /**
   * 2nd useEffect function that runs each time the provider is updated
   */
  useEffect(() => {
    if (provider) {
      if (provider !== window.ethereum) {
        console.error('Not window.ethereum provider. You may have multiple wallets installed');
      }
      setIsMetaMaskInstalled(true);
    }
  }, [provider])
  /**
   * Detect Provider in login component which returns the provider to use in login handler method
   * checks if library injected by metamask is window.eth
   * else if checks window.web3 for compatibility reasons
   * If nothing is detected, make an warning with a link to install metamask
   */
  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.warn('No Ethereum browser detected, install via Metamask');
    }
    return provider;
  };

  /**
   * onLoginHandler when clicking button component
   * calls detectProvider and check if there is a provider and its window.ethereum if its not, display error msg
   * sends a request to metamask using the provider and metamask will respond by opening login window
   * pass provider from onLogin to parent component in app.js
   */
  const onLoginHandler = async () => {
    setIsConnecting(true);
    await provider.request({
      method: 'eth_requestAccounts'
    });
    setIsConnecting(false);
    props.onLogin(provider);
  };
  // if metamask is notinstalled, display a link to install 
  return (
    <Card className={classes.wallet}>
      {isMetaMaskInstalled &&
      <button onClick={onLoginHandler} className={classes.button} type='button'>
        {!isConnecting && 'Connect'}
        {isConnecting && 'Loading...'}
      </button>}
      {!isMetaMaskInstalled && <p>
        <a href='/'>Install MetaMask</a>
      </p>}
    </Card>
  )
}

export default Wallet;
