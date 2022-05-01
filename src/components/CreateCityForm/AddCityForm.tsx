import React, { useRef } from "react";
import { useCreateCityMutation } from "../../store/API/CityAPI";

const AddCityForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [createCity] = useCreateCityMutation();

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      await createCity(inputRef.current.value);
    }
  };

  return (
    <form>
      <h2>Добавление города</h2>
      <input ref={inputRef} type="text" placeholder="Город" />
      <button type="submit" onClick={(e) => onSubmit(e)}>
        Добавить
      </button>
    </form>
  );
};

export default AddCityForm;
