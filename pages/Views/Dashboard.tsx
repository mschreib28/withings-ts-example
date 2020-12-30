import React, { useEffect, useState } from "react";

async function post(endpoint: string, data: object): Promise<any> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return res.json();
}

const Dashboard = React.memo((props: any) => {
  const [token, setToken] = useState("");
  function getValue(name: string): string {
    const elements = document.getElementsByTagName("form")[0].elements;
    const element = elements.namedItem(name) as HTMLInputElement;
    return element.value || element.dataset.default;
  }

  let data = [];

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  });

  const [graphData, setGraphData] = useState("");

  const getGraphData = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const result: any = await post("/api/withings", {
      action: getValue("type"),
      token: token,
    });
    const json_stream = result;
    console.log("result: ", json_stream);
    let response: any;
    for (response in json_stream.remoteResponse[0]) {
      let _series = json_stream.remoteResponse[0][response].body.series;
      for (let timestep in _series) {
        let seriesData = _series[timestep];
        let { calories, deviceid, distance, durration, elevation, model, model_id, steps, duration, heart_rate } = seriesData;
        data.concat(seriesData);
      }
    }
    setGraphData(JSON.stringify(json_stream.remoteResponse[0]));
  };

  return (
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
          <ul>{graphData}</ul>
        </div>
      </div>
    </main>
  );
});

export default Dashboard;
