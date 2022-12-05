import classes from "./NotFound.module.css";
import "../index.css";

export default function NotFound() {
  return (
    <h2 className={`heading-secondary ${classes["not-found"]}`}>
      You are visiting wrong page ;)
    </h2>
  );
}
