
const Nav = () => {
  return (
    <div style={{border:"1px solid white", 
        width:"100%", 
        borderRadius:"10px", 
        //padding:"25px",
        backgroundImage: "url('/img/back.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white"}}>
  
        <div className="col-12" style={{ textAlign:"center",backgroundColor: "rgba(0, 0, 0, 0.5)", borderRadius: "10px", padding: "20px"  }}>
        <img
            style={{ borderRadius: "50%", maxHeight:"100px" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAve-HxyZKbjAq4gWGSTF2yg5Z7eX8W4G5GQ&s"
            alt=""
        />
        <h2>El Buen Sabor - Tu Tienda de Comida Online</h2>
        <p>Bienvenido a El Buen Sabor, tu destino número uno para disfrutar de deliciosas comidas desde la comodidad de tu hogar. Nos especializamos en ofrecer una amplia variedad de productos gastronómicos, desde comidas rápidas hasta platos gourmet, siempre con la mejor calidad y al mejor precio.</p>
        </div>
      
    </div>
  )
}

export default Nav
