import React from "react";
import styles from "./Typeracer.module.scss";

import CapsLockWarning from "../../components/CapsLockWarning";
import Restart from "../../components/Restart";

import IQuote from "../../interfaces/quote";

interface Props {
  quote: IQuote;
  typed: string;
  isGameFocused: boolean;
  isCapsLockOn: boolean | null;
  isRestartFocused: boolean | null;
}

const Typeracer: React.FC<Props> = ({
  quote,
  typed,
  isGameFocused,
  isCapsLockOn,
  isRestartFocused,
}) => {
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
        {/* <div className={styles["backdrop"]}></div> */}
      </div>
      <Restart focused={isRestartFocused} />
    </>
  );
};

export default Typeracer;
