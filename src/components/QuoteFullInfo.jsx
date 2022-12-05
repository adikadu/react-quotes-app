import classes from "./QuoteFullInfo.module.css";
import "../index.css";
import { useParams, Link, Route, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "./Ui/Card";
import { Fragment } from "react";
import QuoteComments from "./QuoteComments";

export default function QuoteFullInfo(props) {
  const match = useRouteMatch();
  const params = useParams();
  const quoteArr = useSelector((state) =>
    state.quotes.filter((quote) => quote.id === params.quoteId)
  );
  if (!quoteArr.length)
    return <p className={classes["not-found"]}>No quote found :(</p>;
  return (
    <Fragment>
      <Card className="full-quote">
        <h2 className="heading-secondary">{quoteArr[0].text}</h2>
        <p className={classes["move-to-end"]}>{quoteArr[0].author}</p>
      </Card>
      <Route path={match.path} exact>
        <Link
          className={classes["load-comment-link"]}
          to={`${match.url}/comments`}
        >
          Load Comments
        </Link>
      </Route>
      <Route path={`${match.path}/comments`}>
        <QuoteComments />
      </Route>
    </Fragment>
  );
}
