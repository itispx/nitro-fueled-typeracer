import type { NextPage } from "next";

import React, { useState, useEffect } from "react";
import styles from "./Home.module.scss";

import { getQuoteQuery } from "../../queries/api/quotesQueries";

import Typeracer from "../../components/Typeracer";

import IQuote from "../../interfaces/quote";

const Home: NextPage = () => {
  const [quote, setQuote] = useState<IQuote | undefined>();

  useEffect(() => {
    getQuoteHandler();
  }, []);

  async function getQuoteHandler() {
    const { quote: fetchedQuote } = await getQuoteQuery();

    setQuote(fetchedQuote);
  }

  return (
    <>
      <div className={styles["home-container"]}>
        <div className={styles["typeracer-margin-top"]} />
        {quote && <Typeracer quote={quote} />}
      </div>
    </>
  );
};

export default Home;
