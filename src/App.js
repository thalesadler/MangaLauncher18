import './App.css';
import {Container, Typography, SvgIcon} from '@material-ui/core/';
import 'fontsource-roboto';
import MangaIcon from './assets/Logo';
import MangaLauncher from "./components/MangaLauncher";
import Login from "./components/Login";
import LoginService from './dados/LoginService';
import { useState, useEffect } from 'react';

function App() {
  const loginService = new LoginService();
  const [logado,setLogado] = useState(false);

  useEffect(() => {
    function atualizaLogado(dados) {
        setLogado(dados.logado);
    }

    loginService.inscrever(atualizaLogado);
    return () => {
      loginService.desinscrever(atualizaLogado);
    };
  }, []);

  return (
    <Container component="article" maxWidth="md">
      <Typography variant="h4" align="center" component="h1">
          MangaLauncher
          <SvgIcon component={MangaIcon}/>
      </Typography>
      <p/>
      {logado
      ? <MangaLauncher/> 
      : <Login service={loginService}/>
      }
           
    </Container>
  );
}

export default App;
