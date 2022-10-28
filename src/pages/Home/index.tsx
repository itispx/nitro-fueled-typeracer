import type { NextPage } from "next";

import React from "react";
import styles from "./Home.module.scss";

import { useQuery } from "react-query";
import { getQuoteQuery } from "../../queries/api/quotesQueries";

import { InfinitySpin } from "react-loader-spinner";

import Typeracer from "../../components/Typeracer";

const Home: NextPage = () => {
  function refreshQuote() {
    refetch();
  }

  const { data, status, refetch } = useQuery(["quote"], getQuoteQuery, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className={styles["home-container"]}>
        <div className={styles["typeracer-margin-top"]} />
        {status === "loading" && <InfinitySpin width="200" color="#7f7b82" />}
        {status === "error" && <div className={styles["error"]}>error fetching data</div>}
        {status === "success" && <Typeracer quote={data} />}
      </div>
    </>
  );
};

export default Home;
