import type { NextPage } from "next";

import React, { useState } from "react";
import styles from "./Home.module.scss";

import { useQuery } from "react-query";
import { getQuoteQuery } from "../../queries/api/quotesQueries";

import { InfinitySpin } from "react-loader-spinner";

import useKeydown from "../../hooks/useKeydown";

import Typeracer from "../../components/Typeracer";

const Home: NextPage = () => {
  function refreshQuote() {
    refetch();
  }

  const { data, status, refetch } = useQuery(["quote"], getQuoteQuery, {
    refetchOnWindowFocus: false,
  });

  const [typed, setTyped] = useState("");

  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  useKeydown((e) => {
    // Can't use a switch statement here because switch statements use uses strict comparison (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch#description)
    if (e.key.length === 1) {
      // Key pressed, add to typed
      setTyped((prev) => prev.concat(e.key));
    } else if (e.key === "Backspace") {
      // Backspace pressed, remove the last char from typed
      setTyped((prev) => prev.slice(0, -1));
    } else if (e.key === "Tab") {
      // Highlight restart
    } else if (e.getModifierState("CapsLock")) {
      setIsCapsLockOn(true);
    } else if (!e.getModifierState("CapsLock")) {
      setIsCapsLockOn(false);
    }
  }, []);

  return (
    <>
      <div className={styles["home-container"]}>
        <div className={styles["typeracer-margin-top"]} />
        {status === "loading" && <InfinitySpin width="200" color="#7f7b82" />}
        {status === "error" && <div className={styles["error"]}>error fetching data</div>}
        {status === "success" && (
          <Typeracer quote={data} typed={typed} isCapsLockOn={isCapsLockOn} />
        )}
      </div>
    </>
  );
};

export default Home;
