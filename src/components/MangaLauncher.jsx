import React, {Fragment} from 'react';
import CadastroManga from './CadastroManga'
import GridManga from './GridManga'
import EstadoManga from './EstadoManga'
import EditManga from './EditManga'
import ListaMangas from "../dados/ListaMangas"

function MangaLauncher(){
    const mangas = new ListaMangas();
    mangas.getManga();

    return(
        <Fragment>
            <CadastroManga listamangas={mangas}/>
            <p/>
            <EstadoManga selEstado={mangas.selEstado.bind(mangas)}/>
            <GridManga listamangas={mangas}/>
            <p/>
            <EditManga listamangas={mangas}/>
        </Fragment>
    )
}

export default MangaLauncher;