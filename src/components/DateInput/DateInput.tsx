import React, { FC } from "react";

type InputProps = {
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: Date;
  max?: Date;
};

const DateInput: FC<InputProps> = ({ className, onChange, min, max }) => {
  return (
    <input
      className={className}
      type={"date"}
      onChange={onChange}
      min={min?.toISOString().split("T")[0]}
      max={max?.toISOString().split("T")[0]}
    />
  );
};

export default DateInput;
