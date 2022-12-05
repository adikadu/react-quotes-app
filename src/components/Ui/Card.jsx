import classes from "./Card.module.css";
import "../../index.css";

export default function Card(props) {
  return (
    <div className={`disp-flex ${classes[props.className]} ${classes["card"]}`}>
      {props.children}
    </div>
  );
}
