import React, { useEffect, useRef, useState } from "react";
import DateInput from "../DateInput";
import styles from "./DateForm.module.css";
import { getWindStats } from "../../http/weatherAPI";
import { $city } from "../../http";
import { City } from "../../types/City";

const DateForm = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [cities, setCities] = useState<City[]>([]);
  const [days, setDays] = useState<any>([]); // TODO: delete any type

  useEffect(() => {
    loadCitiesData();
  }, []);

  const citySelect = useRef<HTMLSelectElement>(null);

  const loadCitiesData = async () => {
    const res = await $city.get<City[]>("/");
    setCities(res.data);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(new Date(e.target.value));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(new Date(e.target.value));
  };

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (citySelect.current) {
      const res = await getWindStats(
        cities[citySelect.current.selectedIndex].name,
        startDate,
        endDate
      );
      setDays(res.data.days);
    } else {
      throw new Error("Error with city name");
    }
  };

  // TODO: leave only the form
  return (
    <div>
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
        <select ref={citySelect} className={styles.citiesList}>
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
      <ul>
        {days.map((day: any) => (
          <li>
            Дата: {day.datetime} Направление: {day.winddir} Скорость:{" "}
            {day.windspeed} Порывы: {day.windgust}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DateForm;
