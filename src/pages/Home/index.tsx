import type { NextPage } from "next";

import React, { useState } from "react";
import styles from "./Home.module.scss";

import { useQuery } from "react-query";
import { getQuoteQuery } from "../../queries/api/quotesQueries";

import { InfinitySpin } from "react-loader-spinner";

import useKeydown from "../../hooks/useKeydown";

import Typeracer from "../../components/Typeracer";

const Home: NextPage = () => {
  const { data, status, refetch, isFetching } = useQuery(["quote"], getQuoteQuery, {
    refetchOnWindowFocus: false,
  });

  function refreshQuote() {
    refetch();
    setTyped("");
    setIsRestartFocused(false);
  }

  const [typed, setTyped] = useState("");

  const [isCapsLockOn, setIsCapsLockOn] = useState<boolean | null>(null);
  const [isRestartFocused, setIsRestartFocused] = useState<boolean | null>(null);

  useKeydown((e) => {
    // Can't use a switch statement here because switch statements use uses strict comparison (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch#description)

    console.log(e.key);

    if (e.key.length === 1) {
      // Key pressed, add to typed
      setTyped((prev) => prev.concat(e.key));
    } else if (e.key === "Backspace") {
      e.preventDefault();

      // Backspace pressed, remove the last char from typed
      setTyped((prev) => prev.slice(0, -1));
    } else if (e.key === "Tab") {
      e.preventDefault();

      // Highlight restart
      setIsRestartFocused((prev) => !prev);
    } else if (e.key === "Enter") {
      if (isRestartFocused) refreshQuote();
    } else if (e.key === "CapsLock") {
      e.preventDefault();

      // Show caps lock warning
      setIsCapsLockOn((prev) => !prev);
    }
  }, []);

  return (
    <>
      <div className={styles["home-container"]}>
        <div className={styles["typeracer-margin-top"]} />
        {status === "loading" || isFetching ? (
          <InfinitySpin width="200" color="#7f7b82" />
        ) : (
          <>
            {status === "error" && (
              <div className={styles["error"]}>error fetching data</div>
            )}
            {status === "success" && (
              <Typeracer
                quote={data}
                typed={typed}
                isCapsLockOn={isCapsLockOn}
                isRestartFocused={isRestartFocused}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
