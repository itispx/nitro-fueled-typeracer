import type { NextPage } from "next";
import { useRouter } from "next/router";

import { useState, useLayoutEffect } from "react";
import styles from "./Result.module.scss";

import { useQueryClient } from "react-query";

import useKeydown from "../../hooks/useKeydown";
import useGameStore from "../../stores/useGameStore";

import IQuote from "../../interfaces/quote";

import Restart from "../../components/Restart";

const Result: NextPage = () => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const quote = queryClient.getQueryData("quote") as IQuote;

  const gameStore = useGameStore();

  const [wpm] = useState(() => {
    if (gameStore.startTime && gameStore.endTime) {
      const minutes =
        (gameStore.endTime.getTime() - gameStore.startTime.getTime()) / 1000 / 60;

      return (quote.content.length / 5 / minutes).toFixed(0);
    }

    return "Something went wrong";
  });
  const [acc] = useState("");
  const [time] = useState(() => {
    if (gameStore.startTime && gameStore.endTime) {
      const seconds =
        (gameStore.endTime.getTime() - gameStore.startTime.getTime()) / 1000;

      return seconds.toFixed(0);
    }

    return 0;
  });

  useLayoutEffect(() => {
    if (gameStore.typed.length === 0 || !quote) {
      gameStore.resetTimer();

      router.push("/");
    }
  }, [gameStore, router, quote]);

  useKeydown((e) => {
    if (e.key === "Tab") {
      e.preventDefault();

      if (gameStore.isRestartFocused) {
        gameStore.unfocusRestart();
      } else {
        gameStore.focusRestart();
      }
    } else if (e.key === "Enter") {
      if (gameStore.isRestartFocused) {
        gameStore.nullifyRestart();
        gameStore.capsLockNullify();
        gameStore.cleanTyped();

        router.back();
      }
    }
  }, []);

  return (
    <div className={styles["result-wrapper"]}>
      <div className={styles["result-container"]}>
        <div className={styles["content-container"]}>
          <span className={styles["title"]}>wpm</span>
          <span className={styles["info"]}>{wpm}</span>
          <span className={styles["title"]}>acc</span>
          <span className={styles["info"]}>{acc}</span>
          <span className={styles["title"]}>time</span>
          <span className={styles["info"]}>{time}s</span>
          <span className={styles["title"]}>author</span>
          <span className={styles["info"]}>{quote?.author}</span>
        </div>
      </div>
      <Restart focused={gameStore.isRestartFocused} />
    </div>
  );
};

export default Result;
