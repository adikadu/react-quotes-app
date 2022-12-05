import classes from "./AllQuotes.module.css";
import "../index.css";
import Quote from "./Quote";
import { useSelector, useDispatch } from "react-redux";
import { quoteActions } from "../store/store";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function AllQuotes() {
  const allQuotes = useSelector((state) => state.quotes);
  const [sortType, setSortType] = useState("Ascending");
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(quoteActions.sortQuotes(sortType));
  }, [allQuotes, dispatch, sortType]);
  const sortBtnHandler = () => {
    if (sortType === "Ascending") {
      history.push("/all-quotes?sort=desc");
      setSortType("Decending");
    } else {
      history.push("/all-quotes?sort=asc");
      setSortType("Ascending");
    }
  };
  return (
    <div className={classes["all-quotes"]}>
      <button onClick={sortBtnHandler}>
        Sort {sortType === "Ascending" ? "Decending" : "Ascending"}
      </button>
      <hr />
      <ul className="ul-basic-style">
        {allQuotes.map((quote) => (
          <li key={quote.id}>
            <Quote id={quote.id} author={quote.author} title={quote.text} />
          </li>
        ))}
      </ul>
    </div>
  );
}
