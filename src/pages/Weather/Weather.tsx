import React, { useEffect, useState } from "react";
import DateForm from "../../components/DateForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from "./Weather.module.css";
import { fetchWindInfo } from "../../store/ActionCreators/WindInfo";
import WindRose from "../../components/WindRose/WindRose";
import moment from "moment";

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
		setWindHoursAmountData(
			windRoseDirections.windRoseStats.map((dir) => dir.hoursAmount)
		);
		setLabels(
			windRoseDirections.windRoseStats.map((dir) => dir.cardinalDirection)
		);
	}, [windRoseDirections]);

	return (
		<div className={styles.container}>
			<h1>Роза ветров</h1>
			<DateForm onSubmit={getWindInfo} />
			{isLoading ? (
				<h3>Загрузка...</h3>
			) : error ? (
				<h3>{error}</h3>
			) : (
				windRoseDirections.windRoseStats.length > 0 && (
					<div className={styles.wind_rose__wrapper}>
						<WindRose
							values={{
								labels,
								dataset: windHoursAmountData,
							}}
						/>
						<div className={styles.dates__wind_rose__wrapper}>
							<span className={styles.start_date__wind_rose}>
								Дата начала:{" "}
								{moment(windRoseDirections.startDate).format("DD.MM.YYYY")}
							</span>
							<span className={styles.start_date__wind_rose}>
								Дата окончания:{" "}
								{moment(windRoseDirections.endDate).format("DD.MM.YYYY")}
							</span>
						</div>
						{windRoseDirections.errors.length > 0 && (
							<div>
								<h3>Ошибки</h3>
								{windRoseDirections.errors.map((e) => (
									<p>{e}</p>
								))}
							</div>
						)}
					</div>
				)
			)}
		</div>
	);
};

export default Weather;
