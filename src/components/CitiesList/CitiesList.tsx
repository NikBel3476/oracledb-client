import React, { useEffect } from "react";
import { useTypesSelector } from "../../hooks/useTypesSelector";
import { useActions } from "../../hooks/useActions";

const CitiesList = () => {
  const { cities, loading, error, page, limit } = useTypesSelector(
    (state) => state.city
  );
  const { fetchCities } = useActions();

  useEffect(() => {
    fetchCities();
  }, [page, limit]);

  if (loading) {
    return <h1>Загрузка...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      {cities.map((city) => (
        <div key={city.id}>{city.name}</div>
      ))}
    </div>
  );
};

export default CitiesList;
