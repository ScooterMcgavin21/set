import React from 'react';
import '../styles/Token.css';

/** 
 * Token Component returns the required data:
 * name, symbol, address
 */
const Token = ({tokenData}) => {
  return (
    <div className='card'>
      <div className='card-name'>
        {tokenData.name} 
      </div>
      <div>
        {tokenData.symbol} 
      </div>
      <div>
        {tokenData.address}
      </div>
    </div>
  );
}

export default Token;
