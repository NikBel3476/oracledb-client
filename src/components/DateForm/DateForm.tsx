import React, { useEffect, useState } from "react";
import DateInput from "../DateInput";

import styles from "./DateForm.module.css";
import { getWindStats } from "../../http/weatherAPI";
import { $city } from "../../http";
import { City } from "../../types/City";

const DateForm = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    loadCitiesData();
  }, []);

  const loadCitiesData = async () => {
    const res = await $city.get<City[]>("/");
    setCities(res.data);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(new Date(e.target.value));
    console.log(startDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(new Date(e.target.value));
    console.log(endDate);
  };

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    const res = await getWindStats(startDate, endDate);
    console.log(res.data);
  };

  return (
    <form className={styles.form}>
      <h1>Информация о ветре</h1>
      <div>
        <DateInput
          className={styles.date}
          value={new Date()}
          onChange={handleStartDateChange}
          max={endDate}
        />
        <DateInput
          className={styles.date}
          value={new Date()}
          onChange={handleEndDateChange}
          min={startDate}
        />
      </div>
      <select className={styles.citiesList}>
        {cities.map((city) => (
          <option key={city.id}>{city.name}</option>
        ))}
      </select>
      <button
        className={styles.submit}
        type={"submit"}
        onClick={(e) => onSubmit(e)}
      >
        Подтвердить
      </button>
    </form>
  );
};

export default DateForm;
