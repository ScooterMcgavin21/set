import Card from "../UI/Card/Card";
import classes from "./Home.css";
/**
 * Uppon sucessfully logging into metamask,
 * Component returns address and balance props and is rendered by App
 */
const Home = (props) => {
  return (
    <Card className={classes.home}>
      <h1>Current Wallet Address</h1>
      <p>{props.currentAccount}</p>
      <p>Current Network: {props.currentNetwork}</p>
    </Card>
  );
};
export default Home;
