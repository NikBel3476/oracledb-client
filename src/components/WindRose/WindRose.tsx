import React from "react";
import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend
);

type WindRoseProps = {
	values: {
		labels: string[];
		dataset: number[];
	};
	className?: string;
};

const WindRose: React.FC<WindRoseProps> = ({ className, values }) => {
	const data = {
		labels: values.labels,
		datasets: [
			{
				label: "Количество дней",
				data: values.dataset,
				backgroundColor: "rgba(0, 184, 18, 0.2)",
				borderColor: "rgba(0, 184, 18, 1)",
				borderWidth: 1,
				pointRadius: 3,
			},
		],
	};

	const options = {
		responsive: true,
		aspectRatio: 1,
		scales: {
			r: {
				beginAtZero: true,
			},
		},
	};

	return <Radar className={className} data={data} options={options} />;
};

export default WindRose;
