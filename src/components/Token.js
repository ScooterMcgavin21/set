import React from 'react';
import '../styles/Token.css';

/** 
 * Token Component returns the required data:
 * name, symbol, address
 */
const Token = ({tokenData, position}) => {
  return (
    <div className='card'>
      <sub>{position}</sub>
      <div className='card-name'>
      {tokenData.name} 
      </div>
      <div className='card-symbol'>
      [{tokenData.symbol}] 
      </div>
      <div className='card-address'>
        <u>Set Address:</u> {tokenData.address}
      </div>
    </div>
  );
}

export default Token;
