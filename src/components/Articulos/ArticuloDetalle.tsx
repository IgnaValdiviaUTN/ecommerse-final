import { useEffect, useState } from "react";
import { Button, Card, Carousel } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Nav/Footer";
import Nav from "../Nav/Nav";

type Articulo = {
  denominacion: string;
  precioVenta: number;
  descripcion: string;
  tiempoEstimadoMinutos:number;
  imagenes: { id: number, url: string }[];
};

const ArticuloDetalle = () => {

    const { detalleId } = useParams<{ detalleId: string }>();
    const [articulo,setArticulo] = useState<Articulo>(); 
    const navigate = useNavigate();


    const getArticulo = async () => {
      let datos: Articulo | null = null;
  
      try {
        datos = await getArticuloBack();
      } catch (error) {
        console.error("Error fetching ArticuloManufacturado:", error);
        datos = await getArticuloInsumo();
      }
  
      if (datos) {
        console.log(datos);
        setArticulo(datos);
      } else {
        console.error("No se encontró el artículo");
      }
    };
    
      async function getArticuloBack() {
        const urlServer = "http://localhost:8080/ArticuloManufacturado/" + detalleId;
    
        const response = await fetch(urlServer, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          mode: "cors",
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return await response.json();
      }

      async function getArticuloInsumo() {
        const response = await fetch('http://localhost:8080/ArticuloInsumo/' + detalleId, {
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
        getArticulo();
        console.log(articulo);
      }, []);


  return (
    <div className="p-3" style={{backgroundColor:"rgb(241, 197, 156)",}}>
      <Nav></Nav>

       <div className="col-12 mt-3">
        <Button
          variant="outline-light"
          onClick={() => {
            navigate(-1);
          }}
        >
          Volver
        </Button>
      </div>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'50px'}}>
      <Card style={{ width: '80rem',marginTop:'20px' }}>
            <div style={{padding:'20px',display:'flex',justifyContent:'center',alignItems:'center'}}>

            
        <Carousel>
        {articulo?.imagenes.map((imagen, index) => (
                        <Carousel.Item key={index}>
                            <img src={imagen.url} alt="" style={{ maxHeight: '300px' }} />
                        </Carousel.Item>
                    ))}
      </Carousel>
      </div>

      <Card.Body>
        <Card.Title>{articulo?.denominacion}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">${articulo?.precioVenta}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Tiempo preparación: {articulo?.tiempoEstimadoMinutos | 0} min</Card.Subtitle>
        <hr />
        <Card.Text>
         {articulo?.descripcion}
        </Card.Text>
      </Card.Body>
      </Card>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ArticuloDetalle;