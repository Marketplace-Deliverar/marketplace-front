import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useState, useEffect } from 'react';
import { obtenerDatosPodio } from '../controllers/podioController';


export default function Podio({ data }) {
    const [podio, setDatos] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const datosObtenidos = await obtenerDatosPodio();
                setDatos(datosObtenidos);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="custom table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Puesto</TableCell>
                        <TableCell align="left">Robot</TableCell>
                        <TableCell align="left">Tiempo</TableCell>
                        <TableCell align="left">Diferencia con 1°</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {podio.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell align="left">{row.puesto}</TableCell>
                            <TableCell align="left">{row.username}</TableCell>
                            <TableCell align="left">{row.totalLapTime} min</TableCell>
                            <TableCell align="left">+{row.dif1} min</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}