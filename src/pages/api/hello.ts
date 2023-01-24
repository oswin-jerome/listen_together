// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const Pusher = require("pusher");

  const pusher = new Pusher({
    appId: "1542582",
    key: "c2af354409b506f59ad3",
    secret: "d9432a68ace6eeebeff8",
    cluster: "mt1",
    useTLS: true,
  });

  pusher.trigger("my-channel", "my-event", {
    message: req.query.id,
  });
  res.status(200).json({ name: req.query.toString() });
}
