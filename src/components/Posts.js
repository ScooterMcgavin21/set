import { useEffect, useState } from "react";
import '../styles/Posts.css';
import Token from "./Token";
/**
 * Post function contains async logic to fetch tokensets API data
 * It then maps through the JSON data and renders the the Token Component 
 */
function Posts() {
  /**
   * initilizing token state to empty arrays
   * useEffect hook with an async function inside to get invoked 
   */
  const [tokens, setTokens] = useState([]);
  
  useEffect(() => {
    (async () => {
      let tokenData;
      const ENDPOINT = 'https://api.tokensets.com/public/v2/portfolios';
      try {
        const response = await fetch(ENDPOINT);
        console.log(response);
        
        // console.log(response.portfolios[0]);
        tokenData = (await response.json()).portfolios;
        console.log(response.portfolios)
      } catch (error) {
        console.log('An error occured', error);
        tokenData = [];
      }
      
      // set state data
      setTokens(tokenData);
    })();
  }, []);

  return (
    <div className="container">
      <div className='cards-container'>
        {tokens.map(( token, index ) => (
          
          <Token tokenData={token} key={index} />
        ))}
        console.log(index)
      </div>
    </div>
  );
}

export default Posts;
