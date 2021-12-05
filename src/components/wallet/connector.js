import { InjectedConnector } from '@web3-react/injected-connector';
/**
 * connector function is a Browser Extension that connects the wallet to metamask
 * Chain Ids:
 *          1: "Ethereum Main Network",
 *          3: "Ropsten Test Network",
 *          4: "Rinkeby Test Network",
 *          5: "Goerli Test Network",
 *          42: "Kovan Test Network",
 */

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
})
