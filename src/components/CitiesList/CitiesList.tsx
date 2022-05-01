import React, { useEffect, useState } from "react";
import {
  useDeleteCityMutation,
  useGetCitiesQuery,
  useUpdateCityMutation,
} from "../../store/API/CityAPI";
import styles from "./CitiesList.module.css";

const CitiesList = () => {
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const { data: cities, error, isLoading } = useGetCitiesQuery({ limit, page });
  const [deleteCity, {}] = useDeleteCityMutation();
  const [updateCity, {}] = useUpdateCityMutation();

  useEffect(() => {
    setTimeout(() => {
      setLimit(5);
    }, 2000);
  }, []);

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
          <div className={styles.city_wrapper} key={city.id}>
            <span>{city.name}</span>
          </div>
        ))}
    </div>
  );
};

export default CitiesList;
