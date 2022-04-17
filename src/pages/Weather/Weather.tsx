import React, { useEffect, useState } from "react";
import DateForm from "../../components/DateForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from "./Weather.module.css";
import { fetchWindInfo } from "../../store/ActionCreators/WindInfo";
import WindRose from "../../components/WindRose/WindRose";

const Weather = () => {
  const dispatch = useAppDispatch();
  const { windRoseDirections, isLoading, error } = useAppSelector(
    (state) => state.windInfoReducer
  );

  const getWindInfo = (city: string, startDate: Date, endDate: Date) => {
    dispatch(fetchWindInfo({ city, startDate, endDate }));
  };

  const [windHoursAmountData, setWindHoursAmountData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    setWindHoursAmountData(windRoseDirections.map((dir) => dir.hoursAmount));
    setLabels(windRoseDirections.map((dir) => dir.cardinalDirection));
  }, [windRoseDirections]);

  return (
    <div className={styles.container}>
      <h1>Информация о ветре</h1>
      <DateForm onSubmit={getWindInfo} />
      {isLoading ? (
        <h3>Загрузка...</h3>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        windRoseDirections?.length > 0 && (
          <WindRose
            values={{
              labels,
              dataset: windHoursAmountData,
            }}
          />
        )
      )}
    </div>
  );
};

export default Weather;
