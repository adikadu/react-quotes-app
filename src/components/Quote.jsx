import classes from "./Quote.module.css";
import "../index.css";
import Card from "./Ui/Card";
import { Link } from "react-router-dom";

export default function Quote(props) {
  return (
    <Card className="quote-style">
      <div className={classes["quote-info"]}>
        <p>{props.title}</p>
        <span>{props.author}</span>
      </div>
      <Link to={`/all-quotes/${props.id}`} className={classes["btn"]}>
        View Fullscreen
      </Link>
    </Card>
  );
}
