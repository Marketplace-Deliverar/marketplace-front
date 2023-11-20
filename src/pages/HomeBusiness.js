import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ProductCards from '../components/ProductCards';
import BusinessImage from '../components/BusinessImage';
import { LeftSidebarFilter } from '../leftSidebarFilter';

export default function HomeBusiness({ empresaURL, setNavBarColor }) {

  const [empresa, setEmpresa] = useState(null);
  const [openModal, setOpenModal] = useState(false);

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
    const urlSearchParams = new URLSearchParams(window.location.search);
    const successParam = urlSearchParams.get('success');
    const isSuccess = successParam === 'true';

    if (isSuccess) {
      setOpenModal(true);
    }

    obtenerDatosEmpresa(empresaURL)
      .then((datos) => {
        setEmpresa(datos);
      })
      .catch((error) => {
        console.error("Hubo un problema al obtener los datos de la empresa:", error);
      });
  }, [empresaURL]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <BusinessImage empresa={empresa?.razon_social} setNavBar={setNavBarColor} />
      <Stack direction="row" sx={{ gap: 3 }}>
        <LeftSidebarFilter />
        <ProductCards empresa={empresa} />
      </Stack>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'white',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
          }}
        >
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 50, mb: 2 }} />
          <Typography variant="h5" mb={2}>
            ¡Gracias por elegirnos!
          </Typography>
          <Typography variant="body1">
            La factura estará disponible pronto en la sección 'Mis Pedidos'.
          </Typography>
          <Button onClick={handleCloseModal} variant="contained" color="success" sx={{ mt: 3 }}>
            Cerrar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
