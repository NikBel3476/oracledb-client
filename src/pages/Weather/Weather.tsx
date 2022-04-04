import React, { useEffect, useState } from "react";
import DateForm from "../../components/DateForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from "./Weather.module.css";
import { fetchWindInfo } from "../../store/ActionCreators/WindInfo";

const Weather = () => {
  const [weatherInfo, setWeatherInfo] = useState<any>([]); // TODO: delete any type

  const dispatch = useAppDispatch();
  const { days, isLoading, error } = useAppSelector(
    (state) => state.windInfoReducer
  );

  const getWindInfo = (city: string, startDate: Date, endDate: Date) => {
    dispatch(fetchWindInfo({ city, startDate, endDate }));
  };

  return (
    <div className={styles.container}>
      <h1>Информация о ветре</h1>
      <DateForm onSubmit={getWindInfo} />
      {isLoading ? (
        <h3>Загрузка...</h3>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <ul>
          {days.map((day: any) => (
            <li key={day.datetime}>
              Дата: {day.datetime} Направление: {day.winddir} Скорость:
              {day.windspeed} Порывы: {day.windgust}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Weather;
