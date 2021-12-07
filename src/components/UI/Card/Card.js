import classes from "./Card.css";

/**
 * Component rendered by Wallet and App
 * containing the button as its child
 */
const Card = (props) => {
  return (
    <div className= 'card'>
      {classes.card} {props.className}{props.children}
    </div>
  );
};

export default Card;
