import { Component, OnInit } from '@angular/core';
import { TicketBookingService } from '../../ApiServices/ticketBooking/ticket-booking.service';
import { Event as AppEvent } from '../../ApiServices/event/event.service';
import { UserObject } from '../../modals/user';
import { BookedEventByUser } from '../../modals/bookedEventByUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userObject: UserObject=new UserObject('','','','');
  
  events: AppEvent[] = [];
  bookedEvents:BookedEventByUser[]=[];
  constructor(private ticketBookingService: TicketBookingService,private router:Router) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadBookedEvents();
  }

  loadUserProfile() {
    const userString = localStorage.getItem('loginInfo');
    this.userObject = userString ? JSON.parse(userString) : null;
   
    if(this.userObject){
      if(this.userObject.role!=='User'){
        this.router.navigate(['/home']);
      }
    }
    else{
      this.router.navigate(['/home']);
    }
   
  }

  loadBookedEvents() {
    if (this.userObject) {
      console.log(this.userObject);
      this.ticketBookingService.getBookedEvents(this.userObject.id).subscribe(
        (response: any) => {
          this.bookedEvents=response;
         console.log(response);
        },
        (error:any) => {
          console.error('Error fetching booked events:', error);
        }
      );
    }
  }
}
