import React from "react";
import styles from "./CapsLockWarning.module.scss";

import { FiLock } from "react-icons/fi";

interface Props {
  active: boolean;
}

const CapsLockWarning: React.FC<Props> = ({ active }) => {
  return active ? (
    <div className={styles["caps-lock-warning-container"]}>
      <FiLock color="#1e1e24" />
      <span> Caps Lock</span>
    </div>
  ) : null;
};

export default CapsLockWarning;
