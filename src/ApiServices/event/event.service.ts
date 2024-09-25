// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class EventService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



export class Event {
  
  id:string;
  name: string;
  image: string;
  url: string;
  date:Date;
  
  description: string;
  location: string;
  category: string;
  constructor(
    id:string,
    name: string,
    image: string,
    url: string,
    date:Date,
  
    description: string,
    location: string,
    category: string
  ) {
    this.id=id;
    this.name = name;
    this.image = image;
    this.url = url;
    this.date=date;
   
    
    this.description = description;
    this.location = location;
    this.category = category;
  }

}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:8080/events'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Save a new event
  createEvent(event: Event): Observable<Event> {
    console.log(event);
    return this.http.post<Event>(this.apiUrl, event);
  }

  updateEvent(event: Event): Observable<Event> {
    console.log(event);
    return this.http.put<Event>(`${this.apiUrl}/${event.id}`,event);
  }
  // Optionally, you can add more methods for fetching, updating, or deleting events
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  deleteEvent(id:string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getEventById(id:string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`) as Observable<Event>;
  }
  // getEventsById(id:string): Observable<Event> {
  //   return this.http.get<Event>(`${this.apiUrl}/${id}`);
  // }
}
