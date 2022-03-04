import React, { useState } from "react";
import DateInput from "../DateInput";

import styles from "./DateForm.module.css";
import { getWindStats } from "../../http/weatherAPI";

const DateForm = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

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
    const data = await getWindStats(startDate, endDate);
    console.log(data);
  };

  return (
    <form className={styles.form}>
      <h1>Интервал времени</h1>
      <div>
        <DateInput
          className={styles.date}
          onChange={handleStartDateChange}
          max={endDate}
        />
        <DateInput
          className={styles.date}
          onChange={handleEndDateChange}
          min={startDate}
        />
      </div>
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
