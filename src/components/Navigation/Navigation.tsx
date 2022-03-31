import React from "react";
import { Link } from "react-router-dom";

import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav>
      <Link className={styles.link} to={"/weather"}>
        Погода
      </Link>
      <Link className={styles.link} to={"/cities"}>
        Список городов
      </Link>
    </nav>
  );
};

export default Navigation;
