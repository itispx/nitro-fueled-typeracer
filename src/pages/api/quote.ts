import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";

import IQuote from "../../interfaces/quote";

type Data = {
  quote: IQuote;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { data, status } = await axios.get(
    "https://api.quotable.io/random?minLength=180",
  );

  return res.status(status).json({ quote: data });
}
