import { useState } from "react";
import Card from "../UI/Card/Card";
import classes from "./Wallet.modules.css";

/**
 * Wallet checks if library injected by metamask is window.eth
 * Passing in the eth or web3 package is necessary to allow retrieving chainId, gasPrice and nonce automatically
 * login sends a request to metamask using the provider and responses by opening the login window and calls props onlogin
 */
const Wallet = (props) => {
  // checking if user is cconnected 
  const [isConnecting, setIsConnecting] = useState(false);
  // This function detects most providers injected at window.ethereum
  // check if library injected is ethereum
  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      window.alert("No Ethereum browser detected! Check out MetaMask");
    }
    return provider;
  };

  /**
   * handler function to detect the provider and 
   * pass to into login parent to fetch requests from metamask
   */
  const onLoginHandler = async () => {
    const provider = detectProvider();
    if (provider) {
      if (provider !== window.ethereum) {
        console.error(
          "Not window.ethereum provider."
        );
      }
      setIsConnecting(true);
      await provider.request({
        method: "eth_requestAccounts",
      });
      setIsConnecting(false);
    }
    props.onLogin(provider);
  };

  // returns the home data containing address and amount 
  return (
    <Card className={classes.login}>
      <button onClick={onLoginHandler} className={classes.button} type="button">
        {!isConnecting && "Connect"}
        {isConnecting && "Loading..."}
      </button>
    </Card>
  );
};

export default Wallet;
