import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CityModal.module.css";
import { ICity } from "../../Models/ICity";

const cx = classNames.bind(styles);

type CityModelProps = {
  inputValue?: ICity;
  show: boolean;
  onSubmit: (city: ICity) => void;
};

const CityModal: React.FC<CityModelProps> = ({
  inputValue,
  show,
  onSubmit,
}) => {
  const [newCityName, setNewCityName] = useState<string>(
    inputValue?.name || ""
  );

  useEffect(() => {
    setNewCityName(inputValue?.name || "");
  }, [inputValue]);

  const handleFormClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleCityNameInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCityName(e.target.value);
  };

  const handleFormSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inputValue) {
      onSubmit({
        ...inputValue,
        name: newCityName,
      });
    }
  };

  return (
    <div
      className={cx({
        modal: true,
        modal__active: show,
      })}
    >
      <form
        className={styles.modal__window}
        onClick={(e) => handleFormClick(e)}
      >
        <h3 className={styles.modal__title}>Параметры города</h3>
        <input
          className={styles.city_name__input}
          type="text"
          placeholder="Название города"
          value={newCityName}
          onChange={(e) => handleCityNameInputChange(e)}
        />
        <button
          className={styles.submit__button}
          type="submit"
          onClick={(e) => handleFormSubmit(e)}
        >
          Подтвердить изменения
        </button>
      </form>
    </div>
  );
};

export default CityModal;
