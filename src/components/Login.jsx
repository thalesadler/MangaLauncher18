import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { TextField, Button, Icon } from '@material-ui/core/';

function Login({service}) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [invalidLogin,setInvalidLogin] = useState(false);

    useEffect(() => {
        function atualizaLogin(dados) {
            setInvalidLogin(dados.invalidLogin);
        }

        service.inscrever(atualizaLogin);
        service.loginInicial();
        return () => {
            service.desinscrever(atualizaLogin);
        };
    }, []);

    const styles = {
        marginTop: 75,
      };

    return (
        <Fragment>
            <form style={styles} align="center">
                <TextField
                    id="username"
                    label="Usuário"
                    variant="outlined"
                    style={{ width: "25%" }}
                    size="small"
                    value={username}
                    onChange={event => {
                        setUserName(event.target.value);
                    }}
                />

                <p />

                <TextField
                    id="password"
                    label="Senha"
                    variant="outlined"
                    style={{ width: "25%" }}
                    size="small"
                    type="password"
                    value={password}
                    onChange={event => {
                        setPassword(event.target.value);
                    }}
                />

                <p />

                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    onClick={event => {
                        service.login(username, password);
                    }}
                >
                    Login
                </Button>

                <p/>

                {invalidLogin &&
                <font color="red">Login inválido!!</font>}
            </form>
        </Fragment>
    )
}

export default Login;