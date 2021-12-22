import React, { Suspense } from "react"; //Suspense - для показа инфы, что lazy loading контент грузится
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

//implementing lazy loading
const NewQuote = React.lazy(() => import("./pages/NewQuote"));
const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const AllQuotes = React.lazy(() => import("./pages/AllQuotes"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
          {/* если ни одна из предыдущих ссылок не подойдет (юзер введет неверный адрес), то сработает эта строка.
           * - это любая ссылка, поэтому она должна идти последней */}
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
