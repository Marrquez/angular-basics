import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, expand, forkJoin, map, of, switchMap, from, tap, delay, EMPTY } from 'rxjs';
import { Todo } from '../../store/interfaces';
import { Store } from '@ngrx/store';
import { Add, Remove, Toggle } from '../../store/actions';
import { FormsModule } from '@angular/forms';
import { ApiMockService, RequestNeededElement } from '../../services/api-mock.service';

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
export class NgrxBasicsComponent implements OnInit {
  // basic operations
  myArray = [10, 20, 30];
  private myArrayOf$?: Observable<any>;
  private myArrayFrom$?: Observable<any>;
  private myArrayTab$?: Observable<any>;

  // expand operator
  requestIndex = 0;
  requestChunkSize = 8;
  minValidElements = 16;
  result$?: Observable<any>;

  // todos$: Observable<Todo[]>;
  todos$: Observable<Map<string, Todo[]>>;
  newTodoText: string = '';
  autorText: string = '';

  constructor(
    private store: Store<{ todoState: Array<Todo> }>,
    private apiMockService: ApiMockService
  ) {
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

  ngOnInit() {
    this.result$ = this.request$();
    this.performBasicOperations();
    this.createBasicObs();
  }

  createBasicObs(): void {
    const myObs$: Observable<string> = new Observable(observer => {
      observer.next('Hola');
      observer.next('Mundo');
    });

    myObs$.subscribe(val => {
      console.log(val);
    });
  }

  private performBasicOperations(): void {
    this.myArrayOf$ = of(this.myArray);
    this.myArrayFrom$ = from(this.myArray);


    this.myArrayOf$.subscribe(data => console.log('DataOf', data));
    this.myArrayFrom$.subscribe(data => console.log('DataFrom', data));

    this.myArrayOf$.pipe(tap(data => console.log('DataTap', data)))
      .subscribe(data => console.log('DataTap2', data) );
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

  /////// Block petitions
  request$() {
    let finalData:any = [];
    const request$ = this.requestChunk$(this.requestIndex).pipe(switchMap((listOfElements) => this.getResultsArray(listOfElements)));

    return request$.pipe(
      expand((data)=> 
      {
        finalData = finalData.concat(data);
        
        if(this.minValidElements > finalData.length) {
          this.requestIndex += 8;
          return this.requestChunk$(this.requestIndex).pipe(switchMap((listOfElements) => this.getResultsArray(listOfElements)));
        } else {
          finalData = finalData.slice(0, 16);
        }

        return of(finalData);
    }));
  }

  private getResultsArray(listOfElements: any) {
    let result: any = [];

    listOfElements.filter((element: any) => {
      if (element.requestUrl) {
        result.push(
          this.requestFinalElement$((element as RequestNeededElement).index)
        );
      }

      if (element.value === 'valid') {
        result.push(of(element));
      }
    });

    return result.length > 0 ? forkJoin(result).pipe(map((results: any) => {
      return results.filter((element: any) => {
        return element.value === 'valid';
      });
    })) : of([]);
  }

  // private filterResultsArray(results: any) {
  //   return results.filter((element: any) => {
  //     return element.value === 'valid';
  //   });
  // }

  private requestChunk$(from: number) {
    return this.apiMockService.requestChunk$({
      from,
      count: this.requestChunkSize,
    });
  }

  private requestFinalElement$(index: number) {
    return this.apiMockService.requestFinalElement$(index);
  }
}
