import React, { FC, useEffect, useState } from "react";
import DateInput from "../DateInput";
import styles from "./DateForm.module.css";
import { getWindStats } from "../../http/weatherAPI";
import { $city } from "../../http";
import { City } from "../../types/City";

type dateFormProps = {
  setWeatherInfo: (days: any) => void;
};

const DateForm: FC<dateFormProps> = (props) => {
  const { setWeatherInfo } = props;

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [cities, setCities] = useState<City[]>([]);
  const [currentCityName, setCurrentCityName] = useState<string>("");

  useEffect(() => {
    loadCitiesData();
  }, []);

  const loadCitiesData = async () => {
    const res = await $city.get<City[]>("/");
    setCities(res.data);
    setCurrentCityName(res.data[0].name);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(new Date(e.target.value));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(new Date(e.target.value));
  };

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentCityName) {
      const res = await getWindStats(currentCityName, startDate, endDate);
      setWeatherInfo(res.data.days);
    } else {
      throw new Error("Error with city name");
    }
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
        />
      </div>
      <select
        className={styles.citiesList}
        onChange={(e) => setCurrentCityName(e.target.value)}
      >
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
