import React from "react";
import styles from "./Typeracer.module.scss";

import { useQueryClient } from "react-query";

import useGameStore from "../../stores/useGameStore";

import CapsLockWarning from "../../components/CapsLockWarning";
import Restart from "../../components/Restart";

import IQuote from "../../interfaces/quote";

const Typeracer: React.FC = () => {
  const queryClient = useQueryClient();
  const { content } = queryClient.getQueryData("quote") as IQuote;

  const typed = useGameStore((state) => state.typed);
  const isGameFocused = useGameStore((state) => state.isGameFocused);
  const isCapsLockOn = useGameStore((state) => state.isCapsLockOn);
  const isRestartFocused = useGameStore((state) => state.isRestartFocused);

  const quote = content.replace("—", "-");

  return (
    <div className={styles["typeracer-wrapper"]}>
      <CapsLockWarning active={isCapsLockOn} />
      <span className={styles["word-count"]}>
        {typed.split(" ").length - 1} / {quote.split(" ").length}
      </span>
      <div
        className={`${styles["typeracer-container"]} ${
          isGameFocused ? styles["focus-in"] : styles["focus-out"]
        }`}
      >
        <p className={styles["quote"]}>
          {quote.split("").map((k, index) => {
            let className = "";

            if (!typed[index]) {
            } else if (typed[index] === k) {
              className = "correct";
            } else if (typed[index] !== k) {
              className = "incorrect";
            }

            return (
              <span
                key={index}
                className={
                  k === " " && className === "incorrect"
                    ? styles["incorrect-empty"]
                    : styles[className]
                }
              >
                {k}
              </span>
            );
          })}
        </p>
      </div>
      <Restart focused={isRestartFocused} />
    </div>
  );
};

export default Typeracer;
