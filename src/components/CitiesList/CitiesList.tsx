import React, { useState } from "react";
import { cityAPI } from "../../services/CityService";

const CitiesList = () => {
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const {
    data: cities,
    error,
    isLoading,
  } = cityAPI.useFetchAllCitiesQuery({ limit, page });
  const [createCity, {}] = cityAPI.useCreateCityMutation();
  const [deleteCity, {}] = cityAPI.useDeleteCityMutation();
  const [updateCity, {}] = cityAPI.useUpdateCityMutation();

  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      {cities && cities.map((city) => <div key={city.id}>{city.name}</div>)}
    </div>
  );
};

export default CitiesList;
