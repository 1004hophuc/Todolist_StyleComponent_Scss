import { combineReducers } from 'redux';
import ToDoListReducer from './reducer/ToDoListReducer';

const rootReducer = combineReducers({
    ToDoListReducer
})

export default rootReducer