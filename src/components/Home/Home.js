import React from 'react';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';
/**
 * Uppon clicking 'Connect' btn and sucessfully logging into metamask,
 * Renders Home reusable Card Component,
 * Returns Wallet address and currentNetwork as props 
 */
function Home(props) {
  return (
    <Card className={classes.home}>
      <h1>Connected Address:</h1>
      <p>{props.currentAccount}</p>
      <p>Current Network: {props.currentNetwork}</p>
    </Card>
  );
}

export default Home;
