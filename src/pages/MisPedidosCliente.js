import Tittle from "../components/Tittle";
import ListaMisPedidos from "../components/ListaMisPedidos";

// Styles
import { styled } from "@mui/material/styles";
import { Menu } from "@mui/material";

// Components

const MisPedidosCliente = (props) => {

    return (
      <div>
        <Tittle text='Mis Pedidos' color="#1976d2" align="center" padding="50px"></Tittle>
        <ListaMisPedidos/>
      </div>
  
    );
  };
  
  export default MisPedidosCliente;
  