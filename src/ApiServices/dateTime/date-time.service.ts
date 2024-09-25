import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }
  calDate(dateTime:Date):string{
// console.log(dateTime);
    const year: number = dateTime.getFullYear();
    const month: string = (dateTime.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day: string = dateTime.getDate().toString().padStart(2, '0');
   return `${year}-${month}-${day}`;
  
  
  }
  calTime(dateTime:Date):string{
    const hours: string = dateTime.getHours().toString().padStart(2, '0');
    const minutes: string = dateTime.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
