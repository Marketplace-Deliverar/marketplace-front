import Tittle from "../components/Tittle";
import Carrito from "../components/Carrito";

const CarritoCompras = ({carrito, setCarrito}) => {

  return (
    <div>
      <Tittle text='Mi Carrito' color="#1976d2" align="center" padding="60px"></Tittle>
      <Carrito carrito={carrito} setCarrito={setCarrito} ></Carrito >
    </div>
  );
};

export default CarritoCompras;
