import Card from "../UI/Card/Card";
import classes from "./Home.modules.css";
/**
 * Uppon sucessfully logging into metamask,
 * Component returns address and balance props and is rendered by App
 */
const Home = (props) => {
  return (
    <Card className={classes.home}>
      <h1>Address</h1>
      <p>{props.currentAccount}</p>
      <p>{props.balance} ETH</p>
    </Card>
  );
};
export default Home;
