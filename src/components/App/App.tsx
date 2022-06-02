import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Weather from "../../pages/Weather/Weather";
import Navigation from "../Navigation/Navigation";
import Cities from "../../pages/Cities";
import Header from "../Header/Header";

function App() {
	return (
		<BrowserRouter>
			<Header>
				<Navigation />
			</Header>
			<Routes>
				<Route path="/weather" element={<Weather />} />
				<Route path="/cities" element={<Cities />} />
				<Route path="/*" element={<Navigate to="/weather" />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
