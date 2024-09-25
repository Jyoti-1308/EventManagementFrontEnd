import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../../modals/ticket';
import { Observable } from 'rxjs';
import { BookedEventByUser } from '../../modals/bookedEventByUser';

@Injectable({
  providedIn: 'root'
})
export class TicketBookingService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8080/bookEvent'; 

  bookEvent(ticket: Ticket): Observable<Ticket> {
    console.log(ticket);
    return this.http.post<Ticket>(this.apiUrl, ticket);
  }
  getBookedEvents(userId:string): Observable<BookedEventByUser[]> {
     console.log(userId);
    return this.http.get<BookedEventByUser[]>(`${this.apiUrl}/booked/${userId}`) ;
  }
}
