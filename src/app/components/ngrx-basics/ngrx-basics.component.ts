import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { Todo } from '../../store/interfaces';
import { Store } from '@ngrx/store';
import { Add, Remove, Toggle } from '../../store/actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ngrx-basics',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './ngrx-basics.component.html',
  styleUrl: './ngrx-basics.component.sass'
})
export class NgrxBasicsComponent {
  // todos$: Observable<Todo[]>;
  todos$: Observable<Map<string, Todo[]>>;
  newTodoText: string = '';
  autorText: string = '';
  constructor(private store: Store<{ todoState: Array<Todo> }>) {
    // this.todos$ = store
    // .select((state) => state.todoState);

    this.todos$ = store
      .select((state) => state.todoState)
      .pipe(
        map((todoList) => {
          let autors = new Set<string>();
          let groupedElements = new Map<string, Todo[]>();

          todoList.forEach((ele) => autors.add(ele.autor));

          autors.forEach((autor) => {
            groupedElements.set(autor, todoList.filter((ele) => ele.autor === autor));
          });

          console.log(groupedElements); 

          return groupedElements;
        })
      );
  }
 
  uniqueValue(value: any, index: number, array: any) {
    return array.indexOf(value) === index;
  }

  addTodo() {
    this.store.dispatch(
      Add({ text: this.newTodoText || 'Untitled task', autor: this.autorText })
    );
    this.newTodoText = '';
    this.autorText = '';
  }

  groupElements() {
    console.log();
  }

  removeTodo(id: string) {
    this.store.dispatch(Remove({ id }));
  }

  toggleTodo(id: string) {
    this.store.dispatch(Toggle({ id }));
  }
}
