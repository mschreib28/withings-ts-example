import { NextApiRequest, NextApiResponse } from "next";
import { ACCOUNT_WITHINGS_URL, CALLBACK_URI } from "./constants";
import { CLIENT_ID, CUSTOMER_SECRET } from "./constants.hidden";
import { postData } from "../helpers/PostData";

async function getCallbackResponse(code: string): Promise<any> {
  // Handles the POST request to request the authorization code
  const payload = {
    grant_type: "authorization_code",
    client_id: CLIENT_ID,
    client_secret: CUSTOMER_SECRET,
    code: code,
    redirect_uri: CALLBACK_URI,
  };

  const url = `${ACCOUNT_WITHINGS_URL}/oauth2/token`;
  const remoteResponse = await postData(url, payload);

  console.log("remoteResponse: ", remoteResponse);
  return remoteResponse;
}

export default async function (req: NextApiRequest, res: NextApiResponse<string | withings.DataResult>): Promise<any> {
  switch (req.method) {
    case "POST":
      res.status(200).send(await getCallbackResponse(req.query.code.toString()));
      break;
    default:
      res.status(405).end(); //Method Not Allowed
  }
}
