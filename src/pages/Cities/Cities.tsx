import React from "react";
import CitiesList from "../../components/CitiesList";
import AddCityForm from "../../components/CreateCityForm";
import styles from "./Cities.module.css";

const Cities = () => {
  return (
    <main className={styles.main_wrapper}>
      <AddCityForm />
      <h2>Список городов</h2>
      <CitiesList />
    </main>
  );
};

export default Cities;
