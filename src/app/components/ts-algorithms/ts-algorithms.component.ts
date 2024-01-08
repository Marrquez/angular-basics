import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Permission } from '../../models/user.model';
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

  ngOnInit () {
    console.log(this.getPermissionList(Permission.Read | Permission.Write));

    // this.createArray();
    // this.addItemInArray();
    // this.deleteItemFromArray();
    // this.sumItemsFromArray();
    // this.findUniqValuesInArray();

    let arr: number[] = [9, 8, 2, 5, 1, 5, 7, 3, 4, 5, 6];
    console.log(this.findSumOfNumbers2(arr, 3));
  }

  /*
    Cteate an Array
  */
  createArray(): void {
    let my_ar_ay_1: string[] = ['a', 'b', 'c'];
    let my_multi_type_ar_ay: (string|number|boolean)[] = [1, 'b', 2, 'c', true];
    let my_ar_ay_2: Array<string> = ['a', 'b', 'c'];

    console.log('my_ar_ay_1', my_ar_ay_1);
    console.log('my_multi_type_ar_ay', my_multi_type_ar_ay);
    console.log('my_ar_ay_2', my_ar_ay_2);
  }

  /*
    Add item to array
  */
  addItemInArray(): void {
    let my_ar_ay: number[] = [1, 2, 3, 4];

    console.log('original', my_ar_ay);

    // add to the start
    my_ar_ay.unshift(5);
    console.log('with unshift: ', my_ar_ay);

    // add to the end
    my_ar_ay.push(6);
    console.log('with push: ', my_ar_ay);

    // add to a specifit location (start index, # of elements to replace, new element)
    my_ar_ay.splice(2, 0, 7);
    console.log('with splice: ', my_ar_ay);

    // replace a specifit location (start index, # of elements to replace, new element)
    my_ar_ay.splice(2, 2, 9);
    console.log('with splice (replace): ', my_ar_ay);

     // add using concat method
     console.log('with concat: ', [8].concat(my_ar_ay));
  }
  
  /*
    Delete item from array
  */
  deleteItemFromArray(): void {
    let my_ar_ay: number[] = [1, 2, 3, 4, 5, 6];

    console.log('original', my_ar_ay);

    // using delete operator: replace de element with undefined
    delete my_ar_ay[2];
    console.log('with delete operator: ', my_ar_ay);
    console.log(typeof my_ar_ay[2]);

    // remove last element
    my_ar_ay.pop();
    console.log('with pop operator: ', my_ar_ay);

    // remove first element
    my_ar_ay.shift();
    console.log('with shift operator: ', my_ar_ay);

    // remove specific element
    my_ar_ay.splice(1, 1);
    console.log('with splice operator: ', my_ar_ay);

    // remove width filter/map callback
    my_ar_ay = my_ar_ay.filter((ele: number) => ele !== 4);
    console.log('with filter/map operator: ', my_ar_ay);
  }

  /*
    sum items in array
  */
  sumItemsFromArray(): void {
    let my_ar_ay: number[] = [1, 2, 3, 4, 5, 6];

    console.log('original', my_ar_ay);

    console.log('The sum is: ', my_ar_ay.reduce((sum, current) => sum + current, 0));
  }

  /*
    find unique values in array
  */
  findUniqValuesInArray(): void {
    let my_ar_ay: number[] = [1, 1, 2, 3, 4, 5, 3, 6, 3, 2, 6];
    let uBySet = new Set<number>();

    console.log('original', my_ar_ay);
    
    my_ar_ay.forEach((ele) => uBySet.add(ele));

    console.log('Unique values using Set: ', uBySet);
    console.log('Unique values using Set as array: ', Array.from(uBySet.values()));
    console.log('Unique values using regular JS: ', my_ar_ay.filter(this.uniqueValue));
  }

  uniqueValue(value: any, index: number, array: any) {
    return array.indexOf(value) === index;
  }

  
  /*
    Find the first 2 numbers that sum gives the given value
  */
  findSumOfNumbers(arr: Array<number>, sumValue: number) {
    console.log('original', arr);

    for(let i = 0; i < arr.length; i++) {
      for(let j = 0; j < arr.length; j++) {
        if(i === j) {
          break;
        }

        if (arr[i] + arr[j] === sumValue) {
          return([arr[i], arr[j]]);
        }
      }
    }

    return 'No results found.';
  }

  // 1) For each element in the array, we get the difference between
  // the given number and the current element in the array. 
  // 2) We Put the current element into an object as a key.
  // 3) If any element in the array (if any key in our object) matches 
  // the difference between the given number and the new current 
  // element, return some value.
  // 4) Else, return negative result.
  findSumOfNumbers2(arr: Array<number>, sumValue: number) {
    let obj: any = {}
    let diff;
  
    for (let i = 0; i < arr.length; i++) {
      diff = sumValue - arr[i];
  
      if (obj[diff]) {
        return [diff, arr[i]];
      } else {
        obj[arr[i]] = arr[i];
      }
    }

    return 'No results found.';
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

