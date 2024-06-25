import { useEffect, useState } from "react";
import CardCategoria from "../CardCategoria/CardCategoria";

type Categoria = {
  id: number;
  denominacion: string;
  url_imagen: string;
};
const Inicio = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [filtro, setFiltro] = useState<string>("");

  const getCategorias = async () => {
    let datos: Categoria[] = await getCategoriasFetchJSON();
    setCategorias(datos);
  };

  async function getCategoriasFetchJSON() {
    const urlServer = "http://localhost:8080/categoria/NoInsumo";
    const response = await fetch(urlServer, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
    });
    //console.log(response.json());
    return await response.json();
  }

  useEffect(() => {
    getCategorias();
    console.log(categorias);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(event.target.value);
  };

  const categoriasFiltradas = categorias.filter((categoria) =>
    categoria.denominacion.toLowerCase().includes(filtro.toLowerCase())
  );

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
      <img
        style={{ borderRadius: "50%" }}
        src="https://img.pystatic.com/restaurants/sangucheria-buen-sabor.jpg"
        alt=""
      />

      <h2>El Buen Sabor</h2>

      <input
        style={{ width: "500px" }}
        className="form-control"
        type="text"
        placeholder="Buscar categoría"
        value={filtro}
        onChange={handleInputChange}
      />

      <div
        className="col-12"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {categoriasFiltradas.map((categoria: Categoria) => (
          <CardCategoria
            id={categoria.id}
            denominacion={categoria.denominacion}
            url={categoria.url_imagen}
          ></CardCategoria>
        ))}
      </div>
    </div>
  );
};

export default Inicio;
