import axios from "axios";

import IQuote from "../../interfaces/quote";

export async function getQuoteQuery(): Promise<IQuote> {
  const { data } = await axios.get("/api/quote");

  return data.quote;
}
