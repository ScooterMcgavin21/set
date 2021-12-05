import { useWeb3React } from '@web3-react/core';
import { injected } from './wallet/connector';

/**
 * UseWeb3React Hook values:
 *  - active: is a wallet actively connected right now?
 *  - account: the blockchain address that is connected
 *  - library: this is either web3 or ethers, depending what you passed in
 *  - connector: the current connector. So, when we connect it will be the injected connector in this example
 *  - activate: the method to connect to a wallet
 *  - deactivate: the method to disconnect from a wallet
 */

export default function Home() {
  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  // calls activate function with injected connector as a prop allows to connect to users metamask wallet
  async function connect() {
    try {
      await activate(injected)
    } catch (error) {
      console.log(error)
    }
  }
  // to disconnect
  async function disconnect() {
    try {
      deactivate()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <button onClick={connect} className='btn-connect'>Connect to MetaMask</button>
      {active ? <span>Connected with <b>{account}</b></span> : <span>Not Connected</span>}
      <button onClick={disconnect} className='btn-disconnect'>Disconnect</button>
    </div>
  );
};


