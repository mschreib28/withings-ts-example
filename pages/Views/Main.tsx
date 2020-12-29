import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import useSwr from "swr";
import { useRouter } from "next/dist/client/router";

async function post(endpoint: string, data: object): Promise<withings.DataResult> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return await res.json();
}

async function get(endpoint: string): Promise<withings.DataResult> {
  return await fetch(endpoint, {
    method: "GET",
  });
}

function getValue(name: string): string {
  const elements = document.getElementsByTagName("form")[0].elements;
  const element = elements.namedItem(name) as HTMLInputElement;
  return element.value || element.dataset.default;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = React.memo((props: any) => {
  const router = useRouter();
  const { code } = router.query;
  console.log("code: ", code);

  const [localToken, setLocalToken] = useState("");
  const [graphData, setGraphData] = useState([]);

  const getGraphData = async (e: { preventDefault: () => void }): Promise<void> => {
    e.preventDefault();
    const result: withings.DataResult = await post("/api/withings", {
      parameter: getValue("type"),
    });
    setGraphData(data.concat(JSON.stringify(result)));
  };

  const logout = () => {
    setToken("");
  };

  const setToken = (token: string | string[]) => {
    const tokenStr = token.toString();
    setLocalToken(tokenStr);
    localStorage.setItem("token", tokenStr);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token: ", token);
    setToken(token);
  });

  const { data, error } = useSwr("/api/auth", fetcher);
  if (error) {
    return <div>Failed to load redirect url</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }

  if (!localToken && !code) {
    if (typeof window !== "undefined" && data.redirectUrl) {
      console.log("going to redirect url: ", data.redirectUrl);
      window.location.href = `${data.redirectUrl}`;
    } else {
      return <div>Failed to redirect to login screen.</div>;
    }
  } else if (!localToken && code) {
    setToken(code);
  } else {
    // Already have token -- continue to main page
    console.log("we're good! Display page");
  }

  return (
    <div className="container">
      <a className="logout" onClick={logout}>
        Logout
      </a>
      <Head>
        <title>Withings Data</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h3 className="title"> Withings Data </h3>
        <div className="grid">
          <div className="form card">
            <form lang="en">
              <div>
                <div>
                  <label htmlFor="type">Data Type:</label>
                  <select id="type" name="type">
                    <option value="measure-intraday">Measure: Intraday Activity</option>
                    <option value="measure-workout">Motion: Workout</option>
                    <option value="sleep-get">Sleep: General</option>
                  </select>
                </div>
              </div>
              <div className="submit">
                <button className="submit" onClick={getGraphData}>
                  Get Data
                </button>{" "}
                &rarr;
              </div>
            </form>
          </div>

          <div className="code card">
            <ul>
              {graphData.map((data, i) => (
                <li key={i}>
                  <code>{data}</code>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
});

export default Home;
