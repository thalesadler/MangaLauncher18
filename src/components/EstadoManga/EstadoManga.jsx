import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RadioGroup, Radio, FormControl, FormLabel, FormControlLabel } from "@material-ui/core"

const style = {
        height:40
  }

const styleradio = {
    height:10
}

function EstadoManga({selEstado}) {
    return (      
        <section>
            <FormControl component="fieldset" variant="outlined">
                <RadioGroup style={style} 
                            aria-label="Estado" 
                            name="estado" 
                            defaultValue="Ativo"
                            row
                            onChange={event =>{
                                selEstado(event.target.value);
                            }
                            }>
                    <FormControlLabel value="Ativo" control={<Radio />} label={<span style={{ fontSize: '15px' }}>Em Execução</span>} />
                    <FormControlLabel value="Semanal" control={<Radio />} label={<span style={{ fontSize: '15px' }}>Semanal</span>} />
                    <FormControlLabel value="Pausado" control={<Radio />} label={<span style={{ fontSize: '15px' }}>Pausado</span>} />
                    <FormControlLabel value="Terminado" control={<Radio />} label={<span style={{ fontSize: '15px' }}>Terminado</span>}/>
                </RadioGroup>
            </FormControl>
        </section>
    );
}

export default EstadoManga;