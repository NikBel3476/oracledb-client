import React from "react";
import moment from "moment";

type InputProps = {
  className?: string;
  value?: Date;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: Date;
  max?: Date;
  required: boolean;
};

const DatetimeInput: React.FC<InputProps> = ({
  className,
  value,
  onChange,
  min,
  max,
  required,
}) => {
  return (
    <input
      className={className}
      type={"datetime-local"}
      value={value ? moment(value).format("YYYY-MM-DD[T]HH:mm") : ""}
      onChange={onChange}
      min={min ? moment(min).format("YYYY-MM-DD[T]HH:mm") : ""}
      max={max ? moment(max).format("YYYY-MM-DD[T]HH:mm") : ""}
      required={required}
    />
  );
};

export default DatetimeInput;
