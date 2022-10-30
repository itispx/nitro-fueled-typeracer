import type { NextPage } from "next";

import styles from "./Result.module.scss";

const Result: NextPage = () => {
  return (
    <div className={styles["result-wrapper"]}>
      <div className={styles["result-container"]}></div>
    </div>
  );
};

export default Result;
