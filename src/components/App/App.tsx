import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Weather from "../../pages/Weather";
import CitiesInfo from "../CitiesInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/weather" element={<Weather />} />
        <Route path="/cities" element={<CitiesInfo />} />
        <Route path="/*" element={<Navigate to="/weather" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
