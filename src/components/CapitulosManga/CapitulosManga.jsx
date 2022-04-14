import React, {useState, useEffect} from 'react';
import { TextField, Button } from "@material-ui/core"
import OpenIcon from '@material-ui/icons/OpenInNew';

const style = {
    height:10
}

function CapitulosManga({listamangas}) {
    const [atual, setAtual] = useState(0);
    const [mangas, setMangas] = useState(listamangas);

    useEffect(() => {
        function atualizaAtual(dados) {
            setMangas(dados);
            setAtual(dados.mangaSelecionado.CapituloAtual);
        }

        mangas.inscrever(atualizaAtual);
        return () => {
            mangas.desinscrever(atualizaAtual);
        };
    }, []);

    return (
        <>
            <TextField
                id="outlined-number"
                label="Capítulo Atual"
                type="number"
                size="small"
                value={atual}
                onChange={event => {
                    setAtual(event.target.value)
                }}
                onBlur={event => {
                    mangas.atualizaCap(event.target.value)
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    inputProps: { 
                        min: 0 
                    }
                }}
                variant="outlined"
            />
            <Button
                   variant="contained"
                   size="medium"
                   startIcon={<OpenIcon />}
                   onClick={event => {                       
                       mangas.proximoCap();
                   }
                   }>
                Abrir Próximo
            </Button>
        </>
    );
}

export default CapitulosManga;