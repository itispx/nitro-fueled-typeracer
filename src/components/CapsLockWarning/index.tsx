import React from "react";
import styles from "./CapsLockWarning.module.scss";

import { FiLock } from "react-icons/fi";

interface Props {
  active: boolean;
}

const CapsLockWarning: React.FC<Props> = ({ active }) => {
  return (
    <div
      className={`${styles["caps-lock-warning-container"]} ${
        active ? styles["visible"] : styles["hidden"]
      }`}
    >
      <FiLock color="#1e1e24" />
      <span> Caps Lock</span>
    </div>
  );
};

export default CapsLockWarning;
