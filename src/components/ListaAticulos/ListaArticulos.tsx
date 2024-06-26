import { useEffect, useState } from "react";
import CardArticulo from "../Articulos/CardArticulo";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

type Articulo = {
  id: number;
  denominacion: string;
  precioVenta: number;
  descripcion: string;
  imagenes: { url: string }[];
  categoria: {
    id: number;
  };
};

const ListaArticulos = () => {
  const { categoriaId } = useParams<{ categoriaId: string }>();
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [filtro, setFiltro] = useState<string>("");
  const [orden, setOrden] = useState<string>("default");
  const navigate = useNavigate();

  const getArticulos = async () => {
    let datos: Articulo[] = await getArticulosFetchJSON();
    console.log(datos);
    setArticulos(datos);
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

  useEffect(() => {
    getArticulos();
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
      }}
    >
      <div className="col-12">
        <Button
          variant="outline-info"
          onClick={() => {
            navigate(-1);
          }}
        >
          Volver
        </Button>
      </div>
      <img
        style={{ borderRadius: "50%" }}
        src="https://img.pystatic.com/restaurants/sangucheria-buen-sabor.jpg"
        alt=""
      />

      <h2>El Buen Sabor</h2>
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
                descripcion={articulo.descripcion}
                precio_venta={articulo.precioVenta}
              />
            </div>
          ))
        ) : (
          <h3>No hay Articulos</h3>
        )}
      </div>
    </div>
  );
};

export default ListaArticulos;

