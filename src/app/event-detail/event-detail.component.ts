import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService, Event as AppEvent } from '../../ApiServices/event/event.service';
import { DateTimeService } from '../../ApiServices/dateTime/date-time.service';
import { UserObject } from '../../modals/user';



@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent implements OnInit {
  userObject: UserObject=new UserObject('','','','');
  event: AppEvent = new AppEvent('', '', '', '', new Date(), '', '', '');

  constructor(private route: ActivatedRoute, private router:Router,private eventService: EventService, private dateTimeService: DateTimeService) { }

  ngOnInit() {
    
    const id = this.route.snapshot.paramMap.get("eventId") || ""; // Get the event ID from the route
      this.loadEvent(id);
    
  }

  loadEvent(id: string) {
    console.log(id);
    this.eventService.getEventById(id).subscribe((e: AppEvent) => {
      this.event = e;
    })
    console.log(this.event); // Replace with your method to get the event
  }
  calulateDate(date: Date): string {

    // Or your specific date
    return this.dateTimeService.calDate(new Date(date));
  }
  calulateTime(date: Date): string {

    // Or your specific date
    return this.dateTimeService.calTime(new Date(date));
  }
  openTicketModal(id:string){
console.log(id);
  }
}