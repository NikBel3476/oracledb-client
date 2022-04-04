import React, { useEffect, useState } from "react";
import DateInput from "../DateInput";
import styles from "./DateForm.module.css";
import { cityAPI } from "../../store/API/CityAPI";

type dateFormProps = {
  onSubmit: (city: string, startDate: Date, endDate: Date) => void;
};

const DateForm: React.FC<dateFormProps> = ({ onSubmit }) => {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const [startDate, setStartDate] = useState<Date>(yesterday);
  const [endDate, setEndDate] = useState<Date>(yesterday);
  const [currentCity, setCurrentCity] = useState<string>("");

  const { data: cities, error, isLoading } = cityAPI.useFetchAllCitiesQuery();

  useEffect(() => {
    if (cities) setCurrentCity(cities[0].name);
  }, [cities]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(new Date(e.target.value));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(new Date(e.target.value));
  };

  const onDateFormSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentCity) {
      /*const res = await getWindInfo(currentCity, startDate, endDate);
      setWeatherInfo(res.data.days);*/
      onSubmit(currentCity, startDate, endDate);
    } else {
      throw new Error("Error with selected city name");
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (cities) setCurrentCity(cities[e.target.selectedIndex].name);
  };

  return (
    <form className={styles.form}>
      <div>
        <DateInput
          className={styles.date}
          value={startDate}
          onChange={handleStartDateChange}
          max={endDate}
        />
        <DateInput
          className={styles.date}
          value={endDate}
          onChange={handleEndDateChange}
          min={startDate}
          max={yesterday}
        />
      </div>
      {isLoading ? (
        <h3>Загрузка...</h3>
      ) : error ? (
        <h3>Ошибка загрузки городов</h3>
      ) : (
        <select
          className={styles.citiesList}
          onChange={(e) => handleSelectChange(e)}
        >
          {cities &&
            cities.map((city) => <option key={city.id}>{city.name}</option>)}
        </select>
      )}
      <button
        className={styles.submit}
        type={"submit"}
        onClick={(e) => onDateFormSubmit(e)}
      >
        Подтвердить
      </button>
    </form>
  );
};

export default DateForm;
