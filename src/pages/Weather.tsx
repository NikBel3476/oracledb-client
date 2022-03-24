import React, { useState } from "react";
import DateForm from "../components/DateForm";

import styles from "./Weather.module.css";

const Weather = () => {
  const [weatherInfo, setWeatherInfo] = useState<any>([]); // TODO: delete any type

  return (
    <div className={styles.container}>
      <h1>Информация о ветре</h1>
      <DateForm setWeatherInfo={(days: any) => setWeatherInfo(days)} />
      <ul>
        {weatherInfo.map((day: any) => (
          <li key={day.datetime}>
            Дата: {day.datetime} Направление: {day.winddir} Скорость:
            {day.windspeed} Порывы: {day.windgust}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Weather;
