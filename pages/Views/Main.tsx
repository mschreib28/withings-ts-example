import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import Dashboard from "./Dashboard";
import LoginProcessor from "./LoginProcessor";

const Home = React.memo((props: any) => {
  const router = useRouter();
  const { code } = router.query;
  const [localToken, setLocalToken] = useState("");

  const setToken = (token: string) => {
    setLocalToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken("");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  });

  if (!localToken && code) {
    setToken(code.toString());
  }

  return (
    <div className="container">
      <a className="logout" href="/" onClick={logout}>
        Logout
      </a>
      <Head>
        <title>Withings Data</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!localToken && !code ? <LoginProcessor /> : <Dashboard />}
    </div>
  );
});

export default Home;
