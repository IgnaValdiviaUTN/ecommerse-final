import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "../components/Inicio/Inicio";
import ListaArticulos from "../components/ListaAticulos/ListaArticulos";
import ArticuloDetalle from "../components/Articulos/ArticuloDetalle";
import DetallePromocion from "../components/Promocion/DetallePromocion";

const Rutas: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Inicio />} />
          <Route path="/:categoriaId" element={<ListaArticulos />} />
          <Route path="detalle/:detalleId" element={<ArticuloDetalle />} />
          <Route path="promocion/:promocionId" element={<DetallePromocion />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Rutas;
