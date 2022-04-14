import React, {useState, useEffect} from 'react';
import {Button, Select, MenuItem, InputLabel} from "@material-ui/core";
import AlterIcon from '@material-ui/icons/Loop';

const style = {
    float: "right",
    height: 40
  };

function EditEstado({listamangas}){
    const [estado, setEstado] = useState("Ativo");
    const [mangas, setMangas] = useState(listamangas);

    useEffect(() => {
        function atualizaEstado(dados) {
            setMangas(dados);
            setEstado(dados.estadoSelecionado);
        }

        mangas.inscrever(atualizaEstado);
        return () => {
            mangas.desinscrever(atualizaEstado);
        };
    }, []);

    return (
        <>
        <Button style={style}
                variant="contained"
                size="medium"
                startIcon={<AlterIcon />}
                onClick={event => {
                    mangas.atualizaEstado(estado);
                }}
            >
                Alterar Estado
                </Button>
        <Select style={style}
          value={estado}
          onChange={event => { 
              setEstado(event.target.value)
          }}
          variant="outlined"
        >
          <MenuItem value={"Ativo"}>Ativo</MenuItem>
          <MenuItem value={"Semanal"}>Semanal</MenuItem>
          <MenuItem value={"Pausado"}>Pausado</MenuItem>
          <MenuItem value={"Terminado"}>Terminado</MenuItem>
        </Select>
        
      </>
    )
}

export default EditEstado;