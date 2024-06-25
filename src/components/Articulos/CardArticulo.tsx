import { Button, Card } from "react-bootstrap";

type ArticuloCard = {
  denominacion: string;
  precio_venta: number;
  descripcion: string;
  url: string;
};

const CardArticulo = (articulo: ArticuloCard) => {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={articulo.url} />
        <hr />
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>
            {articulo.denominacion}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            ${articulo.precio_venta}
          </Card.Subtitle>
          <Card.Text>{articulo.descripcion}</Card.Text>
          <div style={{ textAlign: "center" }}>
            <Button variant="primary">Ver detalle</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardArticulo;
