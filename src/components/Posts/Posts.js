import React, { useEffect, useState } from 'react';
import Token from "../Token/Token";
import Sets from '../UI/Sets/Sets';
import classes from './Posts.module.css';
/**
 * Post function contains async logic to fetch tokensets API data
 * It then maps through the JSON data and renders the the Token Component 
 */
function Posts(props) {
  // state to store tokens in an empty array
  const [tokens, setTokens] = useState([]);
  // useEffect to call API during component mounting lifecycle
  useEffect(() => {
    const ENDPOINT = 'https://api.tokensets.com/public/v2/portfolios';
    // async function to fetch data and wait until function loadData(promis) is resolved
    const loadData = async () => {
      try {
        const response = await fetch(ENDPOINT);
        // transform response into JSON and store it in tokenData
        const tokenData = await response.json();
        console.log(response);
        setTokens([...tokenData.portfolios]);
      } catch (error) {
        console.log('error', error);
      }
    };
    loadData();
  }, []);
  
  return (
    <Sets className={classes.container}>
      {tokens.map((token, index) => (
        <Token tokenData={token} position={index} key={index} />
      ))}
    </Sets>   
  );
}

export default Posts;
