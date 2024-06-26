import { Button, Card } from "react-bootstrap";

type ArticuloCard = {
  id: number;
  denominacion: string;
  precio_venta: number;
  descripcion: string;
  url: string;
};

const CardArticulo = (articulo: ArticuloCard) => {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={articulo.url} style={{maxHeight:'150px'}} />
        <hr />
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>
            {articulo.denominacion}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            ${articulo.precio_venta}
          </Card.Subtitle>
          <div style={{ textAlign: "center" }}>
            <a href={`detalle/${articulo.id}`}>
            <Button variant="primary">Ver detalle</Button>
            </a>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardArticulo;
