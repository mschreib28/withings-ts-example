import { NextApiRequest, NextApiResponse } from "next";

async function external(url: string, config?: object): Promise<withings.DataResult> {
  const res = await fetch(url, config);
  const data = await res.json();
  return data;
}

async function get(req: NextApiRequest, res: NextApiResponse<string>): Promise<string> {
  return "Helpful information";
}

// This should be moved to a slug [...] that allows querying different endpoints on Withing's api
async function post(req: NextApiRequest, res: NextApiResponse<withings.DataResult>): Promise<withings.DataResult> {
 const respone = []
  // Would make a request to Withings API using external, or similar
  return null;
}

export default async function (req: NextApiRequest, res: NextApiResponse<string | withings.DataResult>): Promise<any> {
  switch (req.method) {
    case "GET":
      res.status(200).send(await get(req, res));
      break;
    case "POST":
      res.status(200).json(await post(req, res));
      break;
    default:
      res.status(405).end(); //Method Not Allowed
  }
}
