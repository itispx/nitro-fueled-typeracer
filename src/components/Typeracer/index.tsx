import React from "react";
import styles from "./Typeracer.module.scss";

import { useQueryClient } from "react-query";

import useGameStore from "../../stores/useGameStore";

import CapsLockWarning from "../../components/CapsLockWarning";
import Restart from "../../components/Restart";
import Key from "./Key";

import IQuote from "../../interfaces/quote";

const Typeracer: React.FC = () => {
  const queryClient = useQueryClient();
  const quote = queryClient.getQueryData("quote") as IQuote;

  const typed = useGameStore((state) => state.typed);
  const isGameFocused = useGameStore((state) => state.isGameFocused);
  const isCapsLockOn = useGameStore((state) => state.isCapsLockOn);
  const isRestartFocused = useGameStore((state) => state.isRestartFocused);

  return (
    <div className={styles["typeracer-wrapper"]}>
      <CapsLockWarning active={isCapsLockOn} />
      <span className={styles["word-count"]}>
        {typed.split(" ").length - 1} / {quote.content.split(" ").length}
      </span>
      <div
        className={`${styles["typeracer-container"]} ${
          isGameFocused ? styles["focus-in"] : styles["focus-out"]
        }`}
      >
        <p className={styles["quote"]}>
          {quote.content.split("").map((k, index) => {
            return (
              <Key
                key={index}
                k={k}
                correct={!typed[index] ? null : typed[index] === k}
              />
            );
          })}
        </p>
      </div>
      <Restart focused={isRestartFocused} />
    </div>
  );
};

export default Typeracer;
