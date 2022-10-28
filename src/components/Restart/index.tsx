import React from "react";
import styles from "./Restart.module.scss";

import { FiRefreshCcw } from "react-icons/fi";

interface Props {
  focused: boolean;
}

const Restart: React.FC<Props> = ({ focused }) => {
  return (
    <div className={`${styles["restart-container"]} ${focused && styles["focused"]}`}>
      <FiRefreshCcw className={styles["icon"]} />
    </div>
  );
};

export default Restart;
