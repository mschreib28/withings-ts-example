import { getData } from "../helpers/GetData";
import { NextApiRequest, NextApiResponse } from "next";
import { ACCOUNT_WITHINGS_URL, STATE, CALLBACK_URI } from "./constants";
import { CLIENT_ID } from "./constants.hidden";

// This is the initial fetch prior to requesting the full auth code
async function get(): Promise<any> {
  const params = {
    response_type: "code",
    client_id: CLIENT_ID,
    state: STATE,
    scope: "user.info,user.metrics,user.activity",
    redirect_uri: CALLBACK_URI,
    //    'mode': 'demo'
  };

  const url = new URL(`${ACCOUNT_WITHINGS_URL}/oauth2_user/authorize2`);
  url.search = new URLSearchParams(params).toString();

  const remoteResponse: any = await getData(url.toString(), {
    redirect: "follow",
  });

  return JSON.stringify({ redirectUrl: remoteResponse.url });
}

export default async function (req: NextApiRequest, res: NextApiResponse<string | withings.DataResult>): Promise<any> {
  switch (req.method) {
    case "GET":
      res.status(200).json(await get());
      break;
    default:
      res.status(405).end(); //Method Not Allowed
  }
}
