import React, { useEffect, useState } from "react";
import moment from "moment";
import DateInput from "../DateInput";
import styles from "./DateForm.module.css";
import { useGetCitiesQuery } from "../../store/API/CityAPI";

type dateFormProps = {
	onSubmit: (city: string, startDate: Date, endDate: Date) => void;
};

const DateForm: React.FC<dateFormProps> = ({ onSubmit }) => {
	const maxDate = moment().subtract(1, "days").toDate();

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
			.hours(0)
			.minutes(0)
			.seconds(0)
			.millisecond(0)
			.toDate()
	);
	const [currentCity, setCurrentCity] = useState<string>("");

	const { data: cities, error, isLoading } = useGetCitiesQuery();

	useEffect(() => {
		if (cities) setCurrentCity(cities[0].name);
	}, [cities]);

	const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setStartDate(moment(e.target.value).hours(0).toDate());
	};

	const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEndDate(moment(e.target.value).hours(23).toDate());
	};

	const onDateFormSubmit = async (e: React.MouseEvent) => {
		e.preventDefault();
		if (startDate > endDate) {
			alert("Дата начала должна быть меньше даты конца");
			return;
		}
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
			<div className={styles.inputs__date__wrapper}>
				<div className={styles.input__date__wrapper}>
					<label className={styles.input__date__label} htmlFor="Дата начала">
						Начальная дата
					</label>
					<DateInput
						className={styles.input__date}
						value={startDate}
						onChange={handleStartDateChange}
						max={maxDate}
						required={true}
						name="startDate"
					/>
				</div>
				<div className={styles.input__date__wrapper}>
					<label className={styles.input__date__label} htmlFor="endDate">
						Конечная дата
					</label>
					<DateInput
						className={styles.input__date}
						value={endDate}
						onChange={handleEndDateChange}
						max={maxDate}
						required={true}
						name="endDate"
					/>
				</div>
			</div>
			{isLoading ? (
				<h3>Загрузка...</h3>
			) : error ? (
				<h3>Ошибка загрузки городов</h3>
			) : (
				<div className={styles.select__city__wrapper}>
					<span className={styles.select__city__label}>Город</span>
					<select
						className={styles.select__city}
						onChange={(e) => handleSelectChange(e)}
					>
						{cities &&
							cities.map((city) => <option key={city.id}>{city.name}</option>)}
					</select>
				</div>
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
