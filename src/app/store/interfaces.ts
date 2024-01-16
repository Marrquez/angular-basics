export interface Todo {
  text: string;
  autor: string;
  todo: boolean;
  id: string;
}
  
export interface TodoState {
  todos: Todo[];
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}