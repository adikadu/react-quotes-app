import classes from "./AddQuote.module.css";
import "../index.css";
import Card from "./Ui/Card";
import { useRef, useState, Fragment } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { quoteActions } from "../store/store";
import { useHistory, Prompt } from "react-router-dom";

export default function AddQuotes() {
  const history = useHistory();
  const authorRef = useRef();
  const quoteRef = useRef();
  const dispatch = useDispatch();
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const author = authorRef.current.value.trim();
    authorRef.current.value = "";
    const quote = quoteRef.current.value.trim();
    quoteRef.current.value = "";
    const quoteObj = {
      id: nanoid(5),
      text: quote,
      author: author,
      createTime: Date.now(),
    };
    dispatch(quoteActions.addQuote(quoteObj));
    setIsSubmitSuccess(true);
    setTimeout(() => setIsSubmitSuccess(false), 2000);

    await fetch(
      "https://react-http-cc844-default-rtdb.firebaseio.com/quotes.json",
      {
        method: "POST",
        body: JSON.stringify(quoteObj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setTimeout(() => history.push("/all-quotes"), 1300);
  };
  const formFocusHandler = () => setIsEntering(true);
  const btnClickHandler = () => setIsEntering(false);
  return (
    <Fragment>
      <Prompt
        when={isEntering}
        message="Are you sure, you want to move away from the page. All your entered data will be lost!"
      />
      {isSubmitSuccess && (
        <p className={classes["submit-success"]}>Successfully added quote!!!</p>
      )}
      <Card className="form-style">
        <form
          onFocus={formFocusHandler}
          onSubmit={formSubmitHandler}
          className={`disp-flex ${classes["form"]}`}
        >
          <h2 className={`heading-secondary`}>Add Quote</h2>
          <div className={`disp-flex ${classes["lab-inp-gap"]}`}>
            <label htmlFor="author">Author</label>
            <input
              ref={authorRef}
              type="text"
              id="author"
              className={`${classes["width-100"]} ${classes["form-inp"]}`}
            />
          </div>
          <div className={`disp-flex ${classes["lab-inp-gap"]}`}>
            <label htmlFor="quote">Quote</label>
            <textarea
              ref={quoteRef}
              name="quote"
              id="quote"
              className={`${classes["width-100"]} ${classes["form-inp"]} ${classes["height-4"]}`}
            ></textarea>
          </div>
          <button onClick={btnClickHandler} className={classes["submit-btn"]}>
            Add
          </button>
        </form>
      </Card>
    </Fragment>
  );
}
