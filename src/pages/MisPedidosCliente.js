import Tittle from "../components/Tittle";
import ListaMisPedidos from "../components/ListaMisPedidos";
import { useParams } from "react-router";


// Styles
import { styled } from "@mui/material/styles";
import { Menu } from "@mui/material";

// Components

const MisPedidosCliente = (props) => {
  const { uId } = useParams();

    return (
      <div>
        <Tittle text='Mis Pedidos' color="#1976d2" align="center" padding="60px"></Tittle>
        <ListaMisPedidos userId={uId}/>
      </div>
  
    );
  };
  
  export default MisPedidosCliente;
  