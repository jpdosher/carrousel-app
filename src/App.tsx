// App.tsx

import React from "react";
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import Slider from "./Slider";
import Cadastro from "./Registry";
import "./App.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <header className="cabecalho">
        <div>
          <img className="cabecalho__logo" src="public/log.png" alt="Logo" />
        </div>
        <nav id="selectedNav">
          <NavLink className="cabecalho__menu__link" to="/slider">
            SLIDER
          </NavLink>
          <NavLink className="cabecalho__menu__link" to="/registry">
            CADASTRO
          </NavLink>
        </nav>
      </header> 

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/slider" replace />} />
          <Route path="/registry" element={<Cadastro />} />
          <Route path="/slider" element={<Slider />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
