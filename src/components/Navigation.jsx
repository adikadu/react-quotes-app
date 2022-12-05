import { NavLink, Link } from "react-router-dom";
import classes from "./Navigation.module.css";
import "../index.css";

export default function Navigation() {
  return (
    <nav className={`disp-flex ${classes["top-nav"]}`}>
      <Link className="a-basic-style" to="/">
        <h2 className="heading-secondary">Great Quotes</h2>
      </Link>
      <ul className={`disp-flex ul-basic-style ${classes["list"]}`}>
        <li>
          <NavLink
            className={`a-basic-style`}
            activeClassName={classes["active"]}
            to="/all-quotes"
          >
            All Quotes
          </NavLink>
        </li>
        <li>
          <NavLink
            className={`a-basic-style`}
            activeClassName={classes["active"]}
            to="/add-quote"
          >
            Add a Quote
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
