import classes from "./Card.module.css";
/**
 * Component rendered by Wallet and App
 * containing the button as its child
 */
const Card = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>
      {props.children}
    </div>
  );
}

export default Card;
