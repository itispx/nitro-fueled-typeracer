import React from "react";
import styles from "./Typeracer.module.scss";

import { useQueryClient } from "react-query";

import useGameStore from "../../stores/useGameStore";

import CapsLockWarning from "../../components/CapsLockWarning";
import Restart from "../../components/Restart";

import IQuote from "../../interfaces/quote";

const Typeracer: React.FC = () => {
  const typed = useGameStore((state) => state.typed);
  const isGameFocused = useGameStore((state) => state.isGameFocused);
  const isCapsLockOn = useGameStore((state) => state.isCapsLockOn);
  const isRestartFocused = useGameStore((state) => state.isRestartFocused);

  const queryClient = useQueryClient();

  const quote = queryClient.getQueryData("quote") as IQuote;

  return (
    <>
      <CapsLockWarning active={isCapsLockOn} />
      <div
        className={`${styles["typeracer-container"]} ${
          isGameFocused ? styles["focus-in"] : styles["focus-out"]
        }`}
      >
        <p className={styles["quote"]}>
          {quote.content.split("").map((k, index) => {
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
    </>
  );
};

export default Typeracer;
