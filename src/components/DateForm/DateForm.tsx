import React, { useEffect, useState } from "react";
import moment from "moment";
import DatetimeInput from "../DatetimeInput";
import styles from "./DateForm.module.css";
import { cityAPI } from "../../store/API/CityAPI";

type dateFormProps = {
  onSubmit: (city: string, startDate: Date, endDate: Date) => void;
};

const DateForm: React.FC<dateFormProps> = ({ onSubmit }) => {
  const maxDate = moment().subtract(1, "days").hours(23).minutes(0).toDate();

  const [startDate, setStartDate] = useState<Date>(
    moment()
      .subtract(1, "days")
      .hours(0)
      .minutes(0)
      .seconds(0)
      .millisecond(0)
      .toDate()
  );
  const [endDate, setEndDate] = useState<Date>(
    moment()
      .subtract(1, "days")
      .hours(23)
      .minutes(0)
      .seconds(0)
      .millisecond(0)
      .toDate()
  );
  const [currentCity, setCurrentCity] = useState<string>("");

  const { data: cities, error, isLoading } = cityAPI.useFetchAllCitiesQuery();

  useEffect(() => {
    if (cities) setCurrentCity(cities[0].name);
  }, [cities]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = moment(e.target.value).minutes(0).toDate();
    if (newStartDate.getTime() <= endDate.getTime()) {
      setStartDate(newStartDate);
    } else {
      alert("Дата начала должна быть не больше даты окончания");
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = moment(e.target.value).minutes(0).toDate();
    if (newEndDate >= startDate) {
      setEndDate(newEndDate);
    } else {
      alert("Дата окончания должна быть не меньше даты начала");
    }
  };

  const onDateFormSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentCity) {
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
      <div className={styles.inputs__wrapper}>
        <DatetimeInput
          className={styles.input__datetime}
          value={startDate}
          onChange={handleStartDateChange}
          max={endDate}
          required={true}
        />
        <DatetimeInput
          className={styles.input__datetime}
          value={endDate}
          onChange={handleEndDateChange}
          min={startDate}
          max={maxDate}
          required={true}
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
        onClick={onDateFormSubmit}
      >
        Подтвердить
      </button>
    </form>
  );
};

export default DateForm;
