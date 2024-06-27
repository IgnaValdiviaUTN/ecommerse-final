const Footer = () => {
    return (
      <div style={{
        color: "white", // Texto blanco para contraste
        //padding: "20px",
        marginTop: "50px",
        borderTop: "1px solid white",
        borderRadius:"10px",
        backgroundImage: "url('/img/back.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
        <div style={{
            width:"100%",
            height:"100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius:"10px",
            padding:'20px'
        }}>
            <div style={{ width: "100%", 
                margin: "0", 
                display: "flex", 
                justifyContent: "space-between" }}>
                    
            <div style={{ flex: 1, marginRight: "20px" }}>
                <h4>¿Por qué elegirnos?</h4>
                <ul style={{fontSize:'14px'}}>
                <li>Variedad y Calidad: Contamos con un extenso menú que incluye pizzas, pastas, hamburguesas, ensaladas, bebidas y mucho más. Cada producto es seleccionado cuidadosamente para asegurar la máxima frescura y sabor.</li>
                <li>Promociones Exclusivas: Descubre nuestras promociones especiales y descuentos exclusivos que te permitirán disfrutar de tus comidas favoritas sin gastar de más.</li>
                <li>Fácil Navegación y Compra: Nuestra tienda online está diseñada para ofrecerte una experiencia de compra rápida y sencilla. Filtra por categorías, busca productos específicos y ordena por precio o popularidad con unos pocos clics.</li>
                <li>Entrega Rápida: Sabemos que tu tiempo es valioso. Por eso, ofrecemos un servicio de entrega rápido y eficiente para que puedas disfrutar de tu comida en el menor tiempo posible.</li>
                <li>Seguridad en los Pagos: Realiza tus pagos de manera segura a través de nuestra plataforma, que incluye métodos de pago confiables como tarjetas de crédito, débito y Mercado Pago.</li>
                </ul>
            </div>
            <div style={{ flex: 1,fontSize:'14px' }}>
                <h4>Contacto</h4>
                <p>¿Tienes alguna pregunta o necesitas ayuda con tu pedido? No dudes en contactarnos. Estamos aquí para ayudarte y asegurarnos de que tengas la mejor experiencia posible.</p>
            </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
            <p>Con El Buen Sabor, cada comida es una experiencia única. ¡Ordena ahora y disfruta del verdadero sabor en cada bocado!</p>
            </div>
        </div>
      </div>
    );
  };
  
  export default Footer;
  