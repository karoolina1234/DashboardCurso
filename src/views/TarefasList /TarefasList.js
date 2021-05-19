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
  const headers_api = { "x-tenant-id": "karoolina.sm@gmail.com" }

  /*
  Função que salva a tarefa.
  o axios faz um get na api 
  e se for sucesso então cria uma auxiliar 
  chamada novaTarefa que recebe o response.data e então 
  o setTarefas pega o valor de todo o array de tarefas + o novaTarefas
  */
  const salvar = (tarefa) => {
    axios.post(API, tarefa, {
      headers: headers_api
    }).then(response => {
      const novaTarefa = response.data
      setTarefas([...tarefas, novaTarefa])
    }).catch(erro => {
      console.log(erro)
    })
  }

  const listarTarefas = () => {
    axios.get(API, {
      headers: headers_api
    }).then(response => {
      const listaTarefas = response.data;
      setTarefas(listaTarefas)
    }).catch(erro => {
      console.log(erro)
    })
  }
  
  const alterarStatus = (id) => {
    axios.patch(`${API}/${id}`, null, {
      headers: headers_api
    }).then(response =>{
      const lista = [...tarefas]
      lista.forEach(tarefa =>{
        if(tarefa.id === id){
          tarefa.done = true
        }
        setTarefas(lista)
      })
    }).catch(erro=>{
      console.log(erro)
    })
  }
  useEffect(() => {
    listarTarefas();
  }, [])

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={salvar} />
      <div className={classes.content}>
        <TarefasTable alterarStatus={alterarStatus} tarefas={tarefas} />
      </div>
    </div>
  );
};

export default TarefasList;
