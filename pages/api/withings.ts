import { NextApiRequest, NextApiResponse } from "next";
import { QueryData, StartEndDate, StartEndYMD } from "../helpers/DataTypes";
import { MEASURE_URL, SLEEP_URL } from "../helpers/WithingsUrls";
import {
  defaultStartDateTime,
  defaultEndDateTime,
  getQueryData,
  getYMD,
  oneDayInSeconds,
  addStartEndDate,
  addStartEndYMD,
  addMeasureParams,
  addSleepParams,
} from "../helpers/QueryParams";

import { postData } from "../helpers/PostData";

const downloadData = async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  const { startDate, endDate } = req.body;
  // Be explicit for types for action and token
  const token: string = req.body.token;
  const action: string = req.body.action;
  const initialStartDate = startDate || defaultStartDateTime;
  const initialEndDate = endDate || defaultEndDateTime;

  const queryData: QueryData = getQueryData(action, getYMD(initialStartDate), getYMD(initialEndDate));

  let params = {};
  let data = [];
  let promises: Promise<any>[] = [];

  for (let _start: number = initialStartDate; _start <= initialEndDate; _start += oneDayInSeconds) {
    const _end: number = _start + oneDayInSeconds;
    const _startEndDate: StartEndDate = addStartEndDate(_start, _end);

    const _startDateYMD: string = getYMD(_start);
    const _endDateYMD: string = getYMD(_end);
    const _startEndYMD: StartEndYMD = addStartEndYMD(_startDateYMD, _endDateYMD);

    let url: string;
    switch (action) {
      case "measure-intraday":
        url = MEASURE_URL;
        params = { action: "getintradayactivity", access_token: token, ...addMeasureParams(), ..._startEndDate };
        break;
      case "measure-workouts":
        url = MEASURE_URL;
        params = { action: "getworkouts", access_token: token, ...addMeasureParams(), ..._startEndYMD };
        break;
      case "sleep-get":
        url = SLEEP_URL;
        params = { action: "get", access_token: token, ...addSleepParams(), ..._startEndDate };
        break;
    }

    promises.push(
      new Promise(async (resolve, reject) => {
        try {
          postData(url, params).then((result) => {
            // console.log("result: ", result);
            // console.log("got result for params: ", params);
            resolve(result);
          });
        } catch (err) {
          console.error(err);
        }
      })
    );
  }

  await Promise.all(promises).then((result) => {
    data.push(result);
    // console.log("returning data: ", JSON.stringify({ queryData: queryData, remoteResponse: data }));
    res.status(200).json(JSON.stringify({ queryData: queryData, remoteResponse: data }));
  });
};

export default async function (req: NextApiRequest, res: NextApiResponse<string | any>): Promise<any> {
  switch (req.method) {
    case "POST":
      await downloadData(req, res);
      res.end();
      break;
    default:
      res.status(405).end(); //Method Not Allowed
  }
}
