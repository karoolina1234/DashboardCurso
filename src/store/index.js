//reducer principal da aplicação

import { combineReducers } from 'redux'
import { tarefaReducer } from './tarefasReducer'
const mainReducer = combineReducers({
    tarefas: tarefaReducer
})

export default mainReducer