import React from "react";
import styles from "./Restart.module.scss";

import { FiRefreshCcw } from "react-icons/fi";

interface Props {
  focused: boolean | null;
}

const Restart: React.FC<Props> = ({ focused }) => {
  return (
    <div className={styles["restart-wrapper"]}>
      <div
        className={`${styles["restart-container"]} ${
          // This prevents the animation to run when the page loads,
          // Initially the 'focused' state is null, so it won't load the focused-in or the focused-out animation
          // Consequentially it will be either true or false applying the animations
          typeof focused === "boolean"
            ? focused
              ? styles["focused-in"]
              : styles["focused-out"]
            : null
        }`}
      >
        <FiRefreshCcw className={styles["icon"]} />
      </div>
      <div
        className={`${styles["restart-bubble-container"]} ${
          typeof focused === "boolean"
            ? focused
              ? styles["animation-in"]
              : styles["animation-out"]
            : null
        }`}
      >
        <div className={styles["up-point"]} />
        <div className={styles["restart-bubble"]}>restart test</div>
      </div>
    </div>
  );
};

export default Restart;
