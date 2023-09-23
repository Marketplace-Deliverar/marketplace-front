import * as React from 'react';
import Pagination from '@mui/material/Pagination';

const BasicPagination = ({pagActual, cantTotal, onChangePagina}) => {

  const handleChange = (event, value) => {
    onChangePagina(value);
  };
  return (
    <Pagination
      count={Math.ceil(cantTotal / 8)} // Número de elementos por pagina
      page={pagActual}
      onChange={handleChange}
      color="primary"
    />
  );
};

export default BasicPagination;