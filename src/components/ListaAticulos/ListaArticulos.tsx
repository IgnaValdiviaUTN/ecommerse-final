import { useEffect, useState } from "react";
import CardArticulo from "../Articulos/CardArticulo";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Nav from "../Nav/Nav";
import Footer from "../Nav/Footer";

type Articulo = {
  id: number;
  denominacion: string;
  precioVenta: number;
  imagenes: { url: string }[];
  categoria: {
    id: number;
  };
};

interface Promocion {
  id: number;
  denominacion: string;
  precioPromocional: number;
}

const ListaArticulos = () => {
  const { categoriaId } = useParams<{ categoriaId: string }>();
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [filtro, setFiltro] = useState<string>("");
  const [orden, setOrden] = useState<string>("default");
  const navigate = useNavigate();

  const getArticulos = async () => {
    if(categoriaId === "0"){
      let datosPromociones: Promocion[] = await getPromociones();
      console.log("PROMOCIONES",datosPromociones);
      let articulosPromocionados = datosPromociones.map(promocion => ({
        id: promocion.id,
        denominacion: promocion.denominacion,
        precioVenta: promocion.precioPromocional,
        imagenes: [{ url: "https://t3.ftcdn.net/jpg/00/48/29/92/360_F_48299241_I5A7IhGjjSuHYZXuTWhsjvNF2rhIhCMp.jpg" }],
        categoria: { id: 0 } 
      }));
      setArticulos(articulosPromocionados);
    }else{
      let datos: Articulo[] = await getArticulosFetchJSON();
      let datosInsumo: Articulo[] = await getArticulosInsumo();
      console.log("Manufacturado",datos);
      console.log("Insumo",datosInsumo);
      setArticulos([...datos, ...datosInsumo]);
    }
  };

  async function getArticulosFetchJSON() {
    const urlServer = "http://localhost:8080/ArticuloManufacturado";

    const response = await fetch(urlServer, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
    });
    return await response.json();
  }

  async function getArticulosInsumo() {
    const response = await fetch('http://localhost:8080/ArticuloInsumo/noElaborar', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',
    });
    return await response.json();
  };

  async function getPromociones(){
    const response = await fetch('http://localhost:8080/promociones', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',
    });
    return await response.json();
  };

  useEffect(() => {
    getArticulos();
    console.log("Articulos",articulos);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(event.target.value);
  };

  const handleOrdenChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrden(event.target.value);
  };

  const ordenarArticulos = (articulos: Articulo[]) => {
    switch (orden) {
      case "precioAsc":
        return [...articulos].sort((a, b) => a.precioVenta - b.precioVenta);
      case "precioDesc":
        return [...articulos].sort((a, b) => b.precioVenta - a.precioVenta);
      case "alfabetico":
        return [...articulos].sort((a, b) =>
          a.denominacion.localeCompare(b.denominacion)
        );
      default:
        return articulos;
    }
  };

  // Filtrar los artículos por id de categoría y el filtro de texto
  const articulosFiltrados = articulos.filter(
    (articulo) =>
      articulo.categoria.id === parseInt(categoriaId) &&
      articulo.denominacion.toLowerCase().includes(filtro.toLowerCase())
  );

  const articulosOrdenados = ordenarArticulos(articulosFiltrados);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "50px",
        padding: "20px",
        backgroundColor:"rgb(241, 197, 156)",
      }}
    >
      <Nav></Nav>
      <div className="col-12">
        <Button
          variant="outline-light"
          onClick={() => {
            navigate(-1);
          }}
        >
          Volver
        </Button>
      </div>
      
      <div>
        <input
          style={{ width: "500px", marginBottom:'15px' }}
          className="form-control"
          type="text"
          placeholder="Buscar articulo"
          value={filtro}
          onChange={handleInputChange}
        />

        <select
          style={{ width: "500px" }}
          className="form-control"
          value={orden}
          onChange={handleOrdenChange}
        >
          <option value="default">Ordenar por</option>
          <option value="precioAsc">Precio: menor a mayor</option>
          <option value="precioDesc">Precio: mayor a menor</option>
          <option value="alfabetico">Orden alfabético</option>
        </select>
      </div>

      <div
        className="col-12 row"
        style={{
          //border: "1px solid black",
          padding: "30px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {articulosOrdenados.length !== 0 ? (
          articulosOrdenados.map((articulo: Articulo) => (
            <div className="col-4 pb-3" key={articulo.id}>
              <CardArticulo
                id={articulo.id}
                denominacion={articulo.denominacion}
                url={articulo.imagenes[0].url}
                precio_venta={articulo.precioVenta}
                categoria={articulo.categoria.id}
              />
            </div>
          ))
        ) : (
          <h3>No hay Articulos</h3>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ListaArticulos;

