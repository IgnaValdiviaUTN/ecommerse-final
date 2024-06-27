import { Button, Card } from "react-bootstrap";

type ArticuloCard = {
  id: number;
  denominacion: string;
  precio_venta: number;
  url: string;
  categoria: number;
};

const CardArticulo = (articulo: ArticuloCard) => {
  const urlDetalle = articulo.categoria === 0 ? `promocion/${articulo.id}` : `detalle/${articulo.id}`;

  return (
    <div>
      <Card style={{ width: "18rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <Card.Img variant="top" src={articulo.url} style={{ height: '200px', objectFit: 'cover' }} />
        <hr />
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>
            {articulo.denominacion}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            ${articulo.precio_venta}
          </Card.Subtitle>
          <div style={{ textAlign: "center" }}>
            <a href={urlDetalle}>
              <Button variant="warning">Ver detalle</Button>
            </a>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardArticulo;
