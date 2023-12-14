import { createReducer, on } from '@ngrx/store';
import { Todo } from './interfaces';
import { Add, Remove, Toggle } from './actions';

const initialState: Array<Todo> = [];

export const todoReducer = createReducer(
  initialState,
  on(Add, (state, action) => [
    ...state,
    { id: action.text + action.autor, text: action.text, todo: true, autor: action.autor },
  ]),
  on(Remove, (state, action) => state.filter((i) => i.id !== action.id)),
  on(Toggle, (state, action) =>
    state.map((i) => (i.id === action.id ? { ...i, todo: !i.todo } : i))
  )
);
