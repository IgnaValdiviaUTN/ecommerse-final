import { useEffect, useState } from "react";
import CardCategoria from "../CardCategoria/CardCategoria";
import Nav from "../Nav/Nav";
import Footer from "../Nav/Footer";

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
    const promocionCategoria: Categoria = { id: 0, denominacion: "Promociones", url_imagen: "https://th.bing.com/th/id/OIP.hW63BTTjo0P4Wo2al--OtwHaDf?rs=1&pid=ImgDetMain" };
    datos = [promocionCategoria, ...datos];
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
        backgroundColor:"rgb(241, 197, 156)",
      }}
    >
      <Nav></Nav>

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

      <Footer></Footer>
    </div>
  );
};

export default Inicio;
