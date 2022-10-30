import type { NextPage } from "next";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import styles from "./Result.module.scss";

import useKeydown from "../../hooks/useKeydown";
import useGameStore from "../../stores/useGameStore";

import Restart from "../../components/Restart";

const Result: NextPage = () => {
  const router = useRouter();

  const gameStore = useGameStore();

  const [wpm, setWpm] = useState("");
  const [acc, setAcc] = useState("");
  const [time, setTime] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (gameStore.typed.length === 0) {
      router.push("/");
    }
  }, [gameStore, router]);

  useKeydown((e) => {
    console.log(e.key);

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
        <span>wpm: {wpm}</span>
        <span>acc: {acc}</span>
        <span>time: {time}</span>
        <span>author: {author}</span>
      </div>
      <Restart focused={gameStore.isRestartFocused} />
    </div>
  );
};

export default Result;
