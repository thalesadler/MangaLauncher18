import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Menu, MenuItem } from '@material-ui/core';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nome', headerName: 'Nome', width: 635 },
    {
        field: 'atual',
        headerName: 'Atual',
        type: 'number',
        width: 150,
    }
];

function GridManga({ listamangas }) {
    const [rows, setRows] = useState([]);
    const [mangas, setMangas] = useState(listamangas);

    useEffect(() => {
        function atualizaRows(dados) {
            setMangas(dados);
            let rowstemp = [];
            dados.mangas.forEach(manga => {
                rowstemp = [...rowstemp, { id: manga.Id, nome: manga.Nome, atual: manga.CapituloAtual }]
            });
            setRows(rowstemp);
        }

        mangas.inscrever(atualizaRows);
        return () => {
            mangas.desinscrever(atualizaRows);
        };
    }, []);

    return (
        <div style={{ height: 375, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                rowHeight="40"
                hideFooter
                onRowSelected={event => {
                    mangas.selManga(event.data.id);
                }}
            />
        </div>
    );
}

export default GridManga;