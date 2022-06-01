import React from "react";
import moment from "moment";

type InputProps = {
	className?: string;
	value?: Date;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	min?: Date;
	max?: Date;
	required: boolean;
	name?: string;
};

const DateInput: React.FC<InputProps> = ({
	className,
	value,
	onChange,
	min,
	max,
	required,
	name,
}) => {
	return (
		<input
			className={className}
			type={"date"}
			value={value ? moment(value).format("YYYY-MM-DD") : ""}
			onChange={onChange}
			min={min ? moment(min).format("YYYY-MM-DD") : ""}
			max={max ? moment(max).format("YYYY-MM-DD") : ""}
			required={required}
			name={name}
		/>
	);
};

export default DateInput;
