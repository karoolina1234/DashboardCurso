import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { TarefasToolbar, TarefasTable } from './components';
import axios from 'axios'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { listar , salvar, deletar} from 'store/tarefasReducer'
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const TarefasList = (props) => {
  const classes = useStyles();

  const [tarefas, setTarefas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false)
  const [mensagem, setMensagem] = useState('')

  const API = 'https://minhastarefas-api.herokuapp.com/tarefas';


  /*
  Função que salva a tarefa.
  o axios faz um get na api 
  e se for sucesso então cria uma auxiliar 
  chamada novaTarefa que recebe o response.data e então 
  o setTarefas pega o valor de todo o array de tarefas + o novaTarefas
  */
  // const salvar = (tarefa) => {
  //   axios.post(API, tarefa, {
  //     headers: { "x-tenant-id": localStorage.getItem('email_usuario_logado') }
  //   }).then(response => {
  //     const novaTarefa = response.data
  //     setTarefas([...tarefas, novaTarefa])
  //     setMensagem('salvo com sucesso!')
  //     setOpenDialog(true)
  //   }).catch(erro => {
  //     setMensagem('ocorreu um erro')
  //     setOpenDialog(true)
  //   })
  // }
//Devido ao uso do redux n usaremos mais esse metodo
  // const listarTarefas = () => {
  //   axios.get(API, {
  //     headers: { "x-tenant-id": localStorage.getItem('email_usuario_logado') }
  //   }).then(response => {
  //     const listaTarefas = response.data;
  //     setTarefas(listaTarefas)
  //   }).catch(erro => {
  //     console.log(erro)
  //   })
  // }

  const alterarStatus = (id) => {
    axios.patch(`${API}/${id}`, null, {
      headers: { "x-tenant-id": localStorage.getItem('email_usuario_logado') }
    }).then(response => {
      const lista = [...tarefas]
      lista.forEach(tarefa => {
        if (tarefa.id === id) {
          tarefa.done = true
        }
        setTarefas(lista)
        setOpenDialog(true)
        setMensagem('atualizado com sucesso!')
      })
    }).catch(erro => {
      console.log(erro)
    })
  }

  // const deletar = (id) => {
  //   axios.delete(`${API}/${id}`, { headers: { "x-tenant-id": localStorage.getItem('email_usuario_logado') } })
  //     .then(response => {
  //       const lista = tarefas.filter(tarefa => tarefa.id !== id)
  //       setTarefas(lista)
  //       setOpenDialog(true)
  //       setMensagem('Removido com sucesso')
  //     }).catch(erro => {
  //       console.log(erro)
  //     })
  // }
  useEffect(() => {
    props.listar()
  }, [])

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={props.salvar} />
      <div className={classes.content}>
        <TarefasTable
          deleteAction={props.deletar}
          alterarStatus={alterarStatus}
          tarefas={props.tarefas} />
      </div>
      <Dialog open={openDialog} onClose={e => setOpenDialog(false)}>
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>
          {mensagem}
        </DialogContent>
        <DialogActions>
          <Button onClick={e => setOpenDialog(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapSatateToProps = state =>({
  tarefas: state.tarefas.tarefas
})
const mapDispatchToProps = dispatch =>
 bindActionCreators({listar, salvar, deletar}, dispatch)

export default connect(mapSatateToProps, mapDispatchToProps)(TarefasList);
