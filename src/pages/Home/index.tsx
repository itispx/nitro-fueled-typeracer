import type { NextPage } from "next";

import { useEffect } from "react";
import styles from "./Home.module.scss";

import { useQuery } from "react-query";
import { getQuoteQuery } from "../../queries/api/quotesQueries";

import useGameStore from "../../stores/useGameStore";

import { InfinitySpin } from "react-loader-spinner";

import useKeydown from "../../hooks/useKeydown";

import Typeracer from "../../components/Typeracer";

const Home: NextPage = () => {
  const gameStore = useGameStore();

  const { data, status, refetch, isFetching } = useQuery(["quote"], getQuoteQuery, {
    refetchOnWindowFocus: false,
  });

  function refreshQuote() {
    refetch();
    gameStore.cleanTyped();
    gameStore.nullifyRestart();
    gameStore.capsLockNullify();
  }

  useKeydown((e) => {
    // Can't use a switch statement here because switch statements use uses strict comparison (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch#description)

    // console.log(e.key);

    if (e.key.length === 1) {
      // Key pressed, add to typed
      gameStore.type(e.key);
    } else if (e.key === "Backspace") {
      e.preventDefault();

      // Backspace pressed, remove the last char from typed
      gameStore.removeLastTyped();
    } else if (e.key === "Tab") {
      e.preventDefault();

      // Highlight restart
      if (gameStore.isRestartFocused) {
        gameStore.unfocusRestart();
      } else {
        gameStore.focusRestart();
      }
    } else if (e.key === "Enter") {
      if (gameStore.isRestartFocused) {
        refreshQuote();
      }
    } else if (e.key === "CapsLock") {
      e.preventDefault();

      // Show caps lock warning
      gameStore.isCapsLockOn ? gameStore.capsLockOff() : gameStore.capsLockOn();
    }
  }, []);

  // Take focus out of game if restart is focused
  useEffect(() => {
    if (gameStore.isRestartFocused) {
      gameStore.unfocusGame();
    } else {
      gameStore.focusGame();
    }
  }, [gameStore]);

  return (
    <>
      <div className={styles["home-container"]}>
        {status === "loading" || isFetching ? (
          <div className={styles["loading"]}>
            <InfinitySpin width="200" color="#7f7b82" />
          </div>
        ) : (
          <>
            <div className={styles["typeracer-margin-top"]} />
            {status === "error" && (
              <div className={styles["error"]}>error fetching data</div>
            )}
            {status === "success" && <Typeracer quote={data} />}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
