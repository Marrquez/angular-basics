import { createReducer, on } from '@ngrx/store';
import { Todo, TodoState } from './interfaces';
import { Add, Remove, Toggle } from './actions';
import { v4 as uuidv4 } from 'uuid';

const initialState: TodoState = {
  todos: [],
  error: '',
  status: 'pending'
};

export const todoReducer = createReducer(
  initialState,
  on(Add, (state, action) => ({
    ...state,
    todos: [...state.todos, { id: uuidv4(), text: action.text, todo: true, autor: action.autor }],
  })),
  on(Remove, (state, action) => ({...state, todos: state.todos.filter((i) => i.id !== action.id)})),
  on(Toggle, (state, action) =>({...state, todos: state.todos.map((i) => (i.id === action.id ? { ...i, todo: !i.todo } : i))}))
);
