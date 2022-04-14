import React, {useState, useEffect} from 'react';
import { TextField, Button, Icon } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/RemoveCircle';

function CadastroManga({listamangas}) {
    const [nome,setNome] = useState("");
    const [mangas,setMangas] = useState(listamangas);

    return (
        <form>
            <TextField
                id="manga"
                label="Manga"
                variant="outlined"
                style={{ width: "70%" }}
                size="small"
                value={nome}
                onChange={event => {
                    setNome(event.target.value);
                }} 
                />

            <Button
                variant="contained"
                color="primary"
                size="medium"
                startIcon={<AddIcon />}
                onClick={event => {
                    mangas.addManga(nome);
                }}
            >
                Adicionar
                </Button>
            <Button
                variant="contained"
                color="secondary"
                size="medium"
                onClick={event => {
                    mangas.deleteManga();
                }}
                startIcon={<RemoveIcon />}
            >
                Remover
                </Button>

        </form>
    );
}

export default CadastroManga;