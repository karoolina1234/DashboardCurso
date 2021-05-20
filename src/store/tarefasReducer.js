import axios from 'axios'
import {mostrarMensagem} from './mensagensReducer'

const http = axios.create({
    baseURL: 'https://minhastarefas-api.herokuapp.com/'
})
const ACTIONS = {
    LISTAR: 'TAREFAS_LISTAR',
    ADD: 'TAREFAS_ADD',
    REMOVER: 'TAREFAS_REMOVE',
    UPDATE_STATUS: 'TAREFAS_UPDATE'
}
const ESTADO_INICIAL = {
    tarefas: [],
    quantidade:0
}
export const tarefaReducer = (state = ESTADO_INICIAL, action) => {
    switch (action.type) {
        case ACTIONS.LISTAR:
            return { ...state, tarefas: action.tarefas , quantidade:action.tarefas.length}
        case ACTIONS.ADD:
            const lista_tarefas =  [...state.tarefas, action.tarefa]
            return { ...state,
                 tarefas:lista_tarefas,
                 quantidade: lista_tarefas.length
                 }
        case ACTIONS.REMOVER:
            const id = action.id;
            const tarefas =  state.tarefas.filter(tarefa => tarefa.id !== id)
            return{...state, tarefas: tarefas,
            quantidade:tarefas.length}
        case ACTIONS.UPDATE_STATUS:
            const lista = [...state.tarefas]
            lista.forEach(tarefa => {
                if(tarefa.id === action.id){
                    tarefa.done = true
                }
            })
            return{...state, tarefas:lista}
        default:
            return state
    }
}

export function listar() {
    return dispatch => {
        http.get('/tarefas', {
            headers: { "x-tenant-id": localStorage.getItem('email_usuario_logado') }
        }).then(response => {
            dispatch({
                type: ACTIONS.LISTAR,
                tarefas: response.data
            })
        })
    }
}

export function salvar(tarefa) {
    return dispatch => {
        http.post('/tarefas', tarefa, {
            headers: { "x-tenant-id": localStorage.getItem('email_usuario_logado') }
        }).then(response => {
            dispatch([{
                type: ACTIONS.ADD,
                tarefa: response.data
            },mostrarMensagem('salvo com sucesso')])
        })
    }
}

export function deletar(id) {
    return dispatch =>{
        http.delete(`/tarefas/${id}`, {
            headers: { "x-tenant-id": localStorage.getItem('email_usuario_logado')}
        }).then(response =>{
            dispatch([{
                type: ACTIONS.REMOVER,
                id:id
            },mostrarMensagem('removido com sucesso')])
        })
    }
}

export function alterarStatus(id){
    return dispatch => {
    http.patch(`/tarefas/${id}`, null , {
        headers: { "x-tenant-id": localStorage.getItem('email_usuario_logado')}
    }).then(response=>{
        dispatch([{
            type: ACTIONS.UPDATE_STATUS,
            id: id
        },mostrarMensagem('status modificado com sucesso')])
    })
}}