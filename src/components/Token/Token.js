import React from 'react';
import Sets from '../UI/Sets/Sets';
import classes from './Token.module.css';
/** 
 * Token Component contained in reusable sets container and returns the required data:
 * name, symbol, address and position on top
 */
function Token({tokenData, position}) {
  return (
    <Sets className={classes.token}>
      <div className={classes.top}>
        <sub>[{position}]</sub>
        <h3>{tokenData.name}</h3>
        <img alt=''
          src={tokenData.image}
          width='30'
          height='30'
        />
      </div>
      <h2 className={classes.symbol}>[{tokenData.symbol}]</h2>
      <u>Set Address:</u>
      <p className={classes.address}>
        {tokenData.address}
      </p>
    </Sets>
  );
}

export default Token;
