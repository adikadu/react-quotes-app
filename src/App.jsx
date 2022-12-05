import "./App.module.css";

import Navigation from "./components/Navigation";
import AllQuotes from "./components/AllQuotes";
import AddQuote from "./components/AddQuote";
import NotFound from "./components/NotFound";
import QuoteFullInfo from "./components/QuoteFullInfo";
import { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { quoteActions, quoteCommentsActions } from "./store/store";
import { useDispatch } from "react-redux";

let IS_INITIAL = true;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!IS_INITIAL) return;
    (async () => {
      const res = await fetch(
        "https://react-http-cc844-default-rtdb.firebaseio.com/quotes.json"
      );
      const data = await res.json();
      if (!data) return;
      const quotes = Object.keys(data).map((key) => data[key]);
      dispatch(quoteActions.addAllQuotes(quotes));
    })();
  }, [dispatch]);
  useEffect(() => {
    if (!IS_INITIAL) return;
    IS_INITIAL = false;
    (async () => {
      const res = await fetch(
        "https://react-http-cc844-default-rtdb.firebaseio.com/quoteComments.json"
      );
      const data = await res.json();
      if (!data) return;
      dispatch(quoteCommentsActions.addAllComments(data));
    })();
  }, [dispatch]);
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
      </header>
      <Route path="/" exact>
        <Redirect to="/all-quotes" />
      </Route>
      <Switch>
        <Route path="/all-quotes" exact>
          <AllQuotes />
        </Route>
        <Route path="/add-quote">
          <AddQuote />
        </Route>
        <Route path="/all-quotes/:quoteId">
          <QuoteFullInfo />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
