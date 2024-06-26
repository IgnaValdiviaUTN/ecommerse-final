import { useEffect, useState } from "react";
import { Button, Card, Carousel } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

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
        let datos: Articulo = await getArticuloBack();
        console.log(datos);
        setArticulo(datos);
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
        return await response.json();
      }
    
      useEffect(() => {
        getArticulo();
        console.log(articulo);
      }, []);


  return (
    <div className="p-3">
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
        <Card.Subtitle className="mb-2 text-muted">Tiempo preparación: {articulo?.tiempoEstimadoMinutos} min</Card.Subtitle>
        <hr />
        <Card.Text>
         {articulo?.descripcion}
        </Card.Text>
      </Card.Body>
      </Card>
      </div>
    </div>
  );
};

export default ArticuloDetalle;