import { NextApiRequest, NextApiResponse } from "next";
import Withings from "./providers/withings";

// Not used (yet)
const options = {
  providers: [
    Withings({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CUSTOMER_SECRET,
      scope: "user.info,user.metrics,user.activity",
    }),
  ],
};

// This is the /api/auth/callback/withings endpoint, since it's a slug [...callback] it will accept anything under /api/auth/callback/*

export default function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const {
    query: { callback, code },
  } = req;

  const path = `/?code=${code}`;
  res.writeHead(301, {
    Location: path,
  });
  res.end();
  return {};
}
