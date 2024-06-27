import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Carousel } from 'react-bootstrap';
import Nav from '../Nav/Nav';
import Footer from '../Nav/Footer';

type Promocion = {
    id: number;
    denominacion: string;
    fechaDesde: string;
    fechaHasta: string;
    horaDesde: string;
    horaHasta: string;
    descripcionDescuento: string;
    precioPromocional: number;
    tipoPromocion: string;
    imagenes: { id: number, url: string }[];
  };


const DetallePromocion = () => {
  
  const url = import.meta.env.VITE_API_URL;
    const {promocionId} = useParams();
    const [promocion, setPromocion] = useState<Promocion>();
    const navigate = useNavigate();

    const getPromocion = async () => {
        const response = await fetch(`${url}/promociones/`+ promocionId, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          mode: 'cors',
        });
        const data = await response.json();
        console.log("DATA",data);
        setPromocion(data);
      };

      useEffect(() => {
        getPromocion();
      }, []);


  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:"25px",backgroundColor:"rgb(241, 197, 156)", }}>
      <Nav></Nav>

        <div className="col-12" style={{marginTop:'10px'}}>
        <Button
          variant="outline-light"
          onClick={() => {
            navigate(-1);
          }}
        >
          Volver
        </Button>
      </div>
        
        <Card style={{ width: '30rem',marginTop:'20px' }}>
            <div style={{padding:'20px',display:'flex',justifyContent:'center',alignItems:'center'}}>

            
        <Carousel>
        <img src="https://t3.ftcdn.net/jpg/00/48/29/92/360_F_48299241_I5A7IhGjjSuHYZXuTWhsjvNF2rhIhCMp.jpg" alt="" style={{maxWidth:'300px'}}/>
      </Carousel>
      </div>

      <Card.Body>
        <Card.Title>{promocion?.tipoPromocion}: {promocion?.denominacion}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">${promocion?.precioPromocional}</Card.Subtitle>
        <Card.Text>
            Desde: {promocion?.fechaDesde} - Hasta: {promocion?.fechaHasta} 
            <br />
            Solo de: {promocion?.horaDesde} - {promocion?.horaHasta} 
        </Card.Text>
      </Card.Body>
    </Card>
    <Footer></Footer>
    </div>
  )
}

export default DetallePromocion
