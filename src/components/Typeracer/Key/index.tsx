import React, { useState, useEffect, memo } from "react";
import styles from "./Key.module.scss";

interface Props {
  k: string;
  correct: boolean | null;
}

const Key: React.FC<Props> = ({ k, correct }) => {
  const [className, setClassName] = useState("");

  useEffect(() => {
    if (typeof correct === "boolean") {
      if (k === " " && !correct) {
        setClassName("incorrect-empty");
      } else if (correct) {
        setClassName("correct");
      } else {
        setClassName("incorrect");
      }
    } else {
      setClassName("");
    }
  }, [k, correct]);

  return <span className={styles[className]}>{k}</span>;
};

export default memo(Key);
