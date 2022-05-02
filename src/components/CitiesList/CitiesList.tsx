import React, { useState } from "react";
import {
  useDeleteCityMutation,
  useGetCitiesQuery,
  useUpdateCityMutation,
} from "../../store/API/CityAPI";
import styles from "./CitiesList.module.css";
import CityModal from "../CityModal";
import { ICity } from "../../Models/ICity";

const CitiesList = () => {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [currentCity, setCurrentCity] = useState<ICity>();
  const [visibleCityModal, setVisibleCityModal] = useState<boolean>(false);

  const { data: cities, error, isLoading } = useGetCitiesQuery({ limit, page });
  const [updateCity] = useUpdateCityMutation();
  const [deleteCity] = useDeleteCityMutation();

  const handleCityDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    cityId: number
  ) => {
    e.stopPropagation();
    deleteCity(cityId);
  };

  const handleCityItemClick = (e: React.MouseEvent, city: ICity) => {
    setCurrentCity(city);
    setVisibleCityModal(true);
  };

  const onCityModalSubmit = (city: ICity) => {
    updateCity(city);
    setVisibleCityModal(false);
  };

  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      {cities &&
        cities.map((city) => (
          <div
            className={styles.city_wrapper}
            key={city.id}
            onClick={(e) => handleCityItemClick(e, city)}
          >
            <span>{city.name}</span>
            <button type="button" onClick={(e) => handleCityDelete(e, city.id)}>
              Удалить
            </button>
          </div>
        ))}
      <CityModal
        show={visibleCityModal}
        onSubmit={onCityModalSubmit}
        inputValue={currentCity}
      />
    </div>
  );
};

export default CitiesList;
