import React from 'react';
import classes from "./Card.module.css";
/**
 * Wrapping component so it renders all its children components
 * passed through props {props.children} to see whats passed into the card component
 * <Card className="home"> = same attribute as props.className
 * Card style is completed by the home style in index.css to reuse anywhere in the app
 */
function Card(props) {
  return (
    <div className={`${classes.card} ${props.className}`}>
      {props.children}
    </div>
  );
}

export default Card;
