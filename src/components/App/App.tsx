import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Weather from "../../pages/Weather";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/weather" element={<Weather />} />
        <Route path="/*" element={<Navigate to="/weather" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
