import React, { useState, useEffect } from 'react';
import CapitulosManga from '../CapitulosManga';
import EditEstado from '../EditEstado';
import {FormControl, FormLabel, Box} from '@material-ui/core';
import "./EditManga.css"

function EditManga({ listamangas }) {
    const [nome, setNome] = useState("");
    const [mangas, setMangas] = useState(listamangas);

    useEffect(() => {
        function atualizaNome(dados) {
            setMangas(dados);
            setNome(dados.mangaSelecionado.nome);
        }

        mangas.inscrever(atualizaNome);
        return () => {
            mangas.desinscrever(atualizaNome);
        };
    }, []);

    return (
        <div>
                <FormLabel>{nome}</FormLabel>
                <p/>
                <CapitulosManga listamangas={mangas}/>
                <EditEstado listamangas={mangas}/>

        </div>
    )
}

export default EditManga;