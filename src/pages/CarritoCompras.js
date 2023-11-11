import Tittle from "../components/Tittle";
import Carrito from "../components/Carrito";

const CarritoCompras = (props) => {

  return (
    <div>
      <Tittle text='Mi Carrito' color="#1976d2" align="center" padding="60px"></Tittle>
      <Carrito></Carrito>
    </div>
  );
};

export default CarritoCompras;
