import React from "react";
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import Slider from "./Slider.tsx";
import Cadastro from "./Registry.tsx";
import "./App.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <header className="cabecalho">
        <div>
          <img className="cabecalho__logo" src="src/assets/log.png" alt="Logo" />
        </div>
        <nav id="selectedNav">
          <NavLink
            className="cabecalho__menu__link"
            to="/slider"
          >
            SLIDER
          </NavLink>
          <NavLink
            className="cabecalho__menu__link"
            to="/registry"
          >
            CADASTRO
          </NavLink>
        </nav>

        <div>

        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/slider" replace />} /> 
          <Route path="/registry" element={<Cadastro />} />
          <Route path="/slider" element={<Slider />} index /> 
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
