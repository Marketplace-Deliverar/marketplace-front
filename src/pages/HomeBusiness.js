import { useEffect, useState } from "react";

// Styles, images & icons
import { useThemeContext } from "../context/ThemeContextProvider";
import fravega from "./../media/fravega-1.png";
import garbarino from "./../media/garbarino-1.png";
import carrefour from "./../media/carrefour-logo.png";
import marketplace from "./../media/mkt.jpg";

// Custom components
import ProductCards from "../components/ProductCards";
import { LeftSidebarFilter } from "../leftSidebarFilter";

// External components
import Stack from "@mui/material/Stack";

export default function HomeBusiness(props) {
  //TODO: Volverlo atras
  const empresaURL = window.location.hostname;
  const { changeTheme } = useThemeContext();
  const [empresa, setEmpresa] = useState(null);
  const [imagen, setImagen] = useState("");

  const obtenerDatosEmpresa = async (dominio) => {
    try {
      const response = await fetch(
        `https://xorn7asoxb4eecmwmszz5fbc3a0wamui.lambda-url.us-east-1.on.aws/empresas/url/${dominio}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const datos = await response.json();
      return datos;
    } catch (error) {
      console.error(
        "Hubo un problema al obtener los datos de la empresa:",
        error
      );
      throw error;
    }
  };

  useEffect(() => {
    // TODO: Esto viene del back o del login de usuarios?
    // Realizar la solicitud para obtener los datos de la empresa
    obtenerDatosEmpresa(empresaURL)
      .then((datos) => {
        setEmpresa(datos);
        changeTheme(datos.color_primario, datos.color_secundario);
        // TODO: Deberiamos usar el link que viene en los datos?
        switch (datos.razon_social) {
          case "Fravega":
            setImagen(fravega);
            break;
          case "Garbarino":
            setImagen(garbarino);
            break;
          case "Carrefour":
            setImagen(carrefour);
            break;
          default:
            setImagen(marketplace);
            break;
        }
      })
      .catch((error) => {
        console.error(
          "Hubo un problema al obtener los datos de la empresa:",
          error
        );
      });
  }, [empresaURL]);

  const renderBusinessImage = () => {
    if (!empresa) return;
    return (
      <div className="image-container">
        <img
          className="custom-image"
          style={{
            maxWidth: "80%",
            maxHeight: "400px",
            display: "block",
            margin: "0 auto",
          }}
          src={imagen}
          alt="banner_empresa"
        />
      </div>
    );
  };

  return (
    <>
      {empresa && empresa.razon_social && renderBusinessImage()}
      <Stack direction="row" sx={{ gap: 3 }}>
        <LeftSidebarFilter />
        <ProductCards empresa={empresa} />
      </Stack>
    </>
  );
}
