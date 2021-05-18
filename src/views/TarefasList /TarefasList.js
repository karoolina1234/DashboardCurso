import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { TarefasToolbar, TarefasTable } from './components';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const TarefasList = () => {
  const classes = useStyles();

  const [tarefas, setTarefas] = useState([]);

  const API = 'https://minhastarefas-api.herokuapp.com/tarefas';
  const headers_api = { "x-tenant-id": "karoolina.sm@gmail.com"}
  
  const salvar = (tarefa) => {
    axios.post(API, tarefa, {
      headers: headers_api
      }).then(response => {
      listarTarefas();
    }).catch(erro =>{
      console.log(erro)
    })
  }

  const listarTarefas = () =>{
    axios.get(API,{
      headers:headers_api
    }).then(response=>{
      const listaTarefas = response.data;
      setTarefas(listaTarefas)
    }).catch(erro=>{
      console.log(erro)
    })
  }

  useEffect(()=>{
    listarTarefas();
  }, [])
  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={salvar} />
      <div className={classes.content}>
        <TarefasTable tarefas={tarefas} />
      </div>
    </div>
  );
};

export default TarefasList;
