import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ProductCards from "../components/ProductCards";
import BusinessImage from "../components/BusinessImage";
import { LeftSidebarFilter } from "../leftSidebarFilter";
import { useEffect, useState } from "react";

export default function HomeBusiness({ empresaURL, setNavBarColor }) {

  const [empresa, setEmpresa] = useState(null);

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
      console.error("Hubo un problema al obtener los datos de la empresa:", error);
      throw error;
    }
  };

  useEffect(() => {
    // Realizar la solicitud para obtener los datos de la empresa
    obtenerDatosEmpresa(empresaURL)
      .then((datos) => {
        setEmpresa(datos);
      })
      .catch((error) => {
        console.error("Hubo un problema al obtener los datos de la empresa:", error);
      });
  }, [empresaURL]);

  return (
    <div>
      <BusinessImage empresa={empresa?.razon_social} setNavBar={setNavBarColor} />
      <Stack direction="row" sx={{ gap: 3 }}>
        <LeftSidebarFilter />
        <ProductCards empresa={empresa} />
      </Stack>
    </div>
  );
}