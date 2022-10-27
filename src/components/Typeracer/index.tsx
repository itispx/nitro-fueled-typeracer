import React, { useState } from "react";
import styles from "./Typeracer.module.scss";

import useKeydown from "../../hooks/useKeydown";

import IQuote from "../../interfaces/quote";

interface Props {
  quote: IQuote;
}

const Typeracer: React.FC<Props> = ({ quote }) => {
  const [typed, setTyped] = useState("");

  useKeydown((e) => {
    if (e.key.length === 1) {
      setTyped((prev) => prev.concat(e.key));
    } else if (e.key === "Backspace") {
      setTyped((prev) => prev.slice(0, -1));
    }
  }, []);

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
            <span key={index} className={styles[className]}>
              {k === " " && className === "incorrect" ? "_" : k}
            </span>
          );
        })}
      </p>
    </div>
  );
};

export default Typeracer;
