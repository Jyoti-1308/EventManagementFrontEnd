import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Ticket } from '../../modals/ticket';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketBookingService } from '../../ApiServices/ticketBooking/ticket-booking.service';
import { UserObject } from '../../modals/user';
// import console = require('console');



@Component({
  selector: 'app-ticket-booking',
  templateUrl: './ticket-booking.component.html',
  styleUrl: './ticket-booking.component.scss'
})
export class TicketBookingComponent implements OnInit {
  bookingForm: FormGroup;
  userObject:UserObject=new UserObject('','','','');
  eventId: string = "";
  readonly standardCost: number = 50; // Cost for Standard tickets

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private ticketBookingService: TicketBookingService) {
    this.bookingForm = this.fb.group({
      standardTickets: [1, [Validators.required, Validators.min(1)]],

    });
  }

  ngOnInit():void {
    const userString = localStorage.getItem('loginInfo');
    this.userObject = userString ? JSON.parse(userString) : null;
   }

  getTotalCost(): number {
    const standardTickets = this.bookingForm.get('standardTickets') ?.value;

    return (standardTickets * this.standardCost);
  }

  onConfirm() {
    if (this.userObject) {
      if (this.bookingForm.valid) {
        const { standardTickets } = this.bookingForm.value;
        const id = "";
        console.log(this.bookingForm.value);
        this.eventId = this.route.snapshot.paramMap.get("eventId") || "";
        console.log(this.eventId);
        const ticket = new Ticket(0, this.getTotalCost(), standardTickets, true, this.eventId,this.userObject.id);
        console.log(ticket);
        this.ticketBookingService.bookEvent(ticket).subscribe(
          (response: any) => {
            console.log(response);
            alert("booking confirmed");
            this.router.navigate(['/home']);
          },
          (error: any) => {
            console.log(error);
            alert(error.statusText);
          }
        );
      }
    }
    else {
      alert("please login first");
      this.router.navigate(['./home'])
    }
  }
  cancelBooking() {
    this.bookingForm.reset();
  }

}