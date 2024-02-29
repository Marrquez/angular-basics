import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "../app.state";
import { todoReducer } from "./reducer";

export const reducers: ActionReducerMap<AppState> = {
    todos: todoReducer
}