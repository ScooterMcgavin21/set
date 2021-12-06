import React from 'react';
import './Token.modules.css';

/** 
 * Token Component returns the required data:
 * name, symbol, address and position on top
 */
const Token = ({tokenData, position}) => {
  return (
    <div className='cards'>
      <div className="img-container">
        <sub>[{position}]</sub>
        <img className='card-img' alt=''
          src={tokenData.image}
          width='30'
          height='30'
        />
      </div>
      {/* <sub>[{position}]</sub> */}
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
