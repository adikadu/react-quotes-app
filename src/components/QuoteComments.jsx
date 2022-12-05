import classes from "./QuoteComments.module.css";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "./Ui/Card";
import { Fragment, useRef, useEffect } from "react";
import { quoteCommentsActions } from "../store/store";

export default function QuoteComments() {
  const dispatch = useDispatch();
  const params = useParams();
  const comments = useSelector((state) => {
    const comments = state.comments.filter(
      (quote) => quote.id === params.quoteId
    )[0];
    if (!comments) return [];
    return comments.comments;
  });
  const commentChange = useSelector((state) => state.comments);

  useEffect(() => {
    (async () =>
      await fetch(
        "https://react-http-cc844-default-rtdb.firebaseio.com/quoteComments.json",
        {
          method: "PUT",
          body: JSON.stringify(commentChange),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ))();
  }, [commentChange]);

  const ref = useRef();
  const AddcommentHandler = async (event) => {
    event.preventDefault();
    const comment = ref.current.value.trim();
    ref.current.value = "";
    if (comment === "") return;
    dispatch(
      quoteCommentsActions.addComment({ id: params.quoteId, comment: comment })
    );
  };

  return (
    <Fragment>
      <ul>
        {comments.map((comment, idx) => (
          <li key={idx}>
            <Card className="comment-box">{comment}</Card>
          </li>
        ))}
      </ul>
      <form
        onSubmit={AddcommentHandler}
        className={`disp-flex ${classes["add-comment-form"]}`}
      >
        <input ref={ref} type="text" placeholder="Add a Comment..." />
        <button className={classes["comment-btn"]}>Add Comment</button>
      </form>
    </Fragment>
  );
}
