import Tittle from "../components/Tittle";
import DatosUsuario from "../components/DatosUsuario";
import { useParams } from "react-router";

const MisDatosCliente = (props) => {
  const { uId } = useParams(); // Obtiene el parámetro "uId" de la URL

  return (
    <div>
      <Tittle text='Mis Datos' color="#1976d2" align="center" padding="60px"></Tittle>
      <DatosUsuario userId={uId} /> {/* Pasa uId como un parámetro a DatosUsuario */}
    </div>
  );
};

export default MisDatosCliente;
