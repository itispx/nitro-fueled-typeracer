import React from "react";
import styles from "./Typeracer.module.scss";

import IQuote from "../../interfaces/quote";

interface Props {
  quote: IQuote;
}

const Typeracer: React.FC<Props> = ({ quote }) => {
  return (
    <div className={styles["typeracer-container"]}>
      <p className={styles["quote"]}>{quote.content}</p>
    </div>
  );
};

export default Typeracer;
