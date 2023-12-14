import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Permission } from '../../models/user.model';
import { Observable, map } from 'rxjs';
import { Todo } from '../../store/interfaces';
import { Store } from '@ngrx/store';
import { Add, Remove, Toggle } from '../../store/actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ts-algorithms',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ], 
  templateUrl: './ts-algorithms.component.html',
  styleUrl: './ts-algorithms.component.sass'
})
export class TsAlgorithmsComponent implements OnInit {  
  title = 'TsAlgorithmsComponent!!';

  todos$: Observable<Todo[]>;
  newTodoText: string = '';
  autorText: string = '';
  constructor(private store: Store<{ todoState: Array<Todo> }>) {
    this.todos$ = store
      .select((state) => state.todoState)
      .pipe(
        map((todoList) => {
          const autors = todoList.filter(this.uniqueValue);
          console.log(autors);

          // groupedData = [];

          return todoList;
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

  ngOnInit () {
    console.log(this.getPermissionList(Permission.Read | Permission.Write));
  }

  /*
  Given five positive integers, find the minimum and maximum values 
  that can be calculated by summing exactly four of the five integers.
  */
  miniMaxSum(arr: number[]): void {
    let [min, max] = [0, 0];
    
    for(let i = 0; i < arr.length; i++) {
        let sum = 0;
        
        for(let j = 0; j < arr.length; j++) {
            if(i !== j) { sum += arr[j]; }
        }    
        
        if(i === 0) { min = max = sum; }
        if(sum < min) { min = sum; } 
        if(sum > max) { max = sum; }
    }
    
    console.log(min + ' ' + max);
}

  /*
  Given an array of integers, calculate the ratios of its elements 
  that are positive, negative, and zero. Print the decimal value of 
  each fraction on a new line with 6 places after the decimal.
  */
  plusMinus(arr: number[]): void {
    let [positives, negatives, neutrals] = [0,0,0];
      arr.forEach((item) => {
          if(item > 0) {
              positives++;
          } else if(item < 0) {
              negatives++;
          } else {
              neutrals++;
          }
      });
      console.log((positives/arr.length).toFixed(6));
      console.log((negatives/arr.length).toFixed(6));
      console.log((neutrals/arr.length).toFixed(6));
  }

  /*
  Given a time in 12-hour AM/PM format, convert it to military (24-hour) time.
  */

  timeConversion(s: string): string {
    let isPM = s.indexOf('PM') !== -1;
    const arr = s.split('');
    let fh = 12;
    
    if(isPM) {
        if(parseInt(arr[0] + arr[1]) !== 12) {
            fh += parseInt(arr[0] + arr[1]);       
        }
        
        const fh2 = fh.toString();
        arr[0] = fh2[0];
        arr[1] = fh2[1];
    } else if(!isPM && parseInt(arr[0] + arr[1]) === 12){
        arr[0]= '0';
        arr[1]= '0';
    } 
    
    
    return arr.join().replace(/,/gi, '').substr(0,arr.length-2);
  }

  /*
  The check digit should be calculated by adding up all digits in each 
  id. If the result of the sum is a number with more than a single digit,
  another iteration is required, and the digits of the result should also
  be added together. This process should repeat until a single-digit number
  is calculated
   */
  createCheckDigit(membershipId: string): number {
    let sum = membershipId.split('').reduce((sum, current) => sum + parseInt(current), 0);
    
    if(sum > 9) {
      return this.createCheckDigit(sum.toString());
    }
    
    return sum;
  }

  getPermissionList(permission: Permission): string[] {
    const arr: string[] = [];
    
    for(const item in Permission){
        if((permission & +Permission[item]) === +Permission[item]){
            arr.push(item)
        }
    }
    return [...arr];
  }
}

