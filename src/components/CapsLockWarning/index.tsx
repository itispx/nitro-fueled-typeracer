import React from "react";
import styles from "./CapsLockWarning.module.scss";

import { FiLock } from "react-icons/fi";

interface Props {
  active: boolean | null;
}

const CapsLockWarning: React.FC<Props> = ({ active }) => {
  console.log({ active });
  return (
    <div
      className={`${styles["caps-lock-warning-container"]} ${
        // This prevents the animation to run when the page loads,
        // Initially the 'active' state is null, so it won't load the visible or the hidden animation
        // Consequentially it will be either true or false applying the animations
        typeof active === "boolean"
          ? active
            ? styles["visible"]
            : styles["hidden"]
          : null
      }`}
    >
      <FiLock className={styles["icon"]} />
      <span> Caps Lock</span>
    </div>
  );
};

export default CapsLockWarning;
