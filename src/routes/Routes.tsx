import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "../components/Inicio/Inicio";
import ListaArticulos from "../components/ListaAticulos/ListaArticulos";

const Rutas: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Inicio />} />
          <Route path="/:categoriaId" element={<ListaArticulos />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Rutas;
