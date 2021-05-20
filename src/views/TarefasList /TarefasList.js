import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { TarefasToolbar, TarefasTable } from './components';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { listar , salvar, deletar, alterarStatus} from 'store/tarefasReducer'
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
  const [openDialog, setOpenDialog] = useState(false)
  const [mensagem, setMensagem] = useState('')

  useEffect(() => {
    props.listar()
  }, [])

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={props.salvar} />
      <div className={classes.content}>
        <TarefasTable
          deleteAction={props.deletar}
          alterarStatus={props.alterarStatus}
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
 bindActionCreators({listar, salvar, deletar, alterarStatus}, dispatch)

export default connect(mapSatateToProps, mapDispatchToProps)(TarefasList);
