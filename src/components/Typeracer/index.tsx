import React from "react";
import styles from "./Typeracer.module.scss";

import IQuote from "../../interfaces/quote";

interface Props {
  quote: IQuote;
  typed: string;
}

const Typeracer: React.FC<Props> = ({ quote, typed }) => {
  return (
    <div className={styles["typeracer-container"]}>
      <p className={styles["quote"]}>
        {quote.content.split("").map((k, index) => {
          let className = "";

          if (!typed[index]) {
          } else if (typed[index] === k) {
            console.log("correct");
            className = "correct";
          } else if (typed[index] !== k) {
            console.log("incorrect");
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
  );
};

export default Typeracer;
