import App from "next/app";
import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import "../styles/global.css";

const history = createMemoryHistory();

const MyApp = React.memo((pageProps: any) => {
  return (
    <Router history={history}>
      <App {...pageProps} />
    </Router>
  );
});

export default MyApp;
