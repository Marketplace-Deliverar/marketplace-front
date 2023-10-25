import Tittle from "../components/Tittle";
import DatosUsuario from "../components/DatosUsuario";


// Styles
import { styled } from "@mui/material/styles";
import { Menu } from "@mui/material";

// Components

const MisDatosCliente = (props) => {

    return (
      <div>
        <Tittle text='Mis Datos' color="#1976d2" align="center" padding="50px"></Tittle>
        <DatosUsuario/>
      
      </div>
  
    );
  };
  
  export default MisDatosCliente;
  