import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, expand, forkJoin, map, of, switchMap, from, tap, takeWhile, zip, interval, first, last, throttle, throttleTime, mergeMap, filter, BehaviorSubject, fromEvent, combineLatest } from 'rxjs';
import { Todo, TodoState } from '../../store/interfaces';
import { Store } from '@ngrx/store';
import { Add, Remove, Toggle } from '../../store/actions';
import { FormsModule } from '@angular/forms';
import { ApiMockService, RequestNeededElement } from '../../services/api-mock.service';
import { selectAllTodos } from '../../store/selectors';
import { AppState } from '../../app.state';

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
  users: Array<any> = [
    {id: '1', name: 'Jhon', isActive: true},
    {id: '2', name: 'Jack', isActive: true},
    {id: '3', name: 'Mike', isActive: true}
  ];

  user$ = new BehaviorSubject<{id: string; name: string, isActive: boolean} | null>(null);
  documentClick$ = fromEvent(document, 'click');

  users$ = of(this.users);
  usernames$ = this.users$.pipe(map((users) => users.map((user) => user.name)));
  filteredUsers$ = this.users$.pipe(filter((users) => users.every((user) => user.isActive)));

  combineLatestData$ = combineLatest([this.users$, this.usernames$, this.filteredUsers$]).pipe(map(([users, usernames, filteredUsers]) => ({users, usernames, filteredUsers})));

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
    private store: Store<AppState>,
    private apiMockService: ApiMockService
  ) {
    // this.todos$ = store
    // .select((state) => state.todoState);

    this.todos$ = store
      .select(selectAllTodos)
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
    // this.mapAndThrottle();
    // this.performBasicOperations();
    // this.createBasicObs();

    // this.zipOperator();
    // this.forkJoinOperator();

    setTimeout(()=>{
      this.user$.next({id: '4', name: 'Carlos', isActive: true});
    }, 3000);

    this.user$.subscribe((newUSer) => {
      console.log('The new user: ', newUSer);
    });

    this.documentClick$.subscribe((e) => {
      console.log('Dom clicked!!');
    });
  }

  private zipOperator():void {
    const pais$ = of('Peru', 'Venezuela', 'Mexico');
    const plato$ = of('Ceviche', 'Arepa', 'frijoles' ,'Tacos');

    const zipObs$ = zip(pais$, plato$);

    zipObs$.subscribe(result => {
      console.log(result);
    });
  }

  private forkJoinOperator(): void {
    const pais$ = of('Peru', 'Venezuela', 'Mexico');
    const plato$ = of('Ceviche', 'Arepa', 'frijoles' ,'Tacos');

    const zipObs$ = forkJoin([pais$, plato$]);

    zipObs$.subscribe(([result, result2]) => {
      console.log(result);
      console.log(result2);
    });
  }

  mapAndThrottle(): void {
    let myObs$: Observable<number> = interval(1000);
    let observer = {
      next: (value: any) => {
        console.log(value); 
      },
      complete: () => {
        console.log('Process completed!!');
      }
    };

    // myObs$.subscribe((value)=> {
    //   console.log(value);
    // });

    myObs$
    .pipe(
      takeWhile((value) => value < 10), 
      map((value) => 'Number: ' + value), 
      throttleTime(2000), // show value and wait 2s before show the next one
    )
    // .pipe(first())
    // .pipe(last())
    .subscribe(observer);
  }

  stopInterval(): void {}

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
