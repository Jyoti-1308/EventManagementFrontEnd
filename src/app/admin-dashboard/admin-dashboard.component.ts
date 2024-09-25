import { Component, OnInit } from '@angular/core';
import { category } from '../categories';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EventService, Event as AppEvent } from '../../ApiServices/event/event.service';
import { DateTimeService } from '../../ApiServices/dateTime/date-time.service';
import { UserObject } from '../../modals/user';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit{
  formattedDate: string = "";
  formattedTime: string = "";
  userObject:UserObject=new UserObject('','','','');
  myEvent={} as AppEvent;
  isEventFormVisible = false;
  isShowEvents = false;
  categories = category;
  events: AppEvent[] = [];
  constructor(
    private eventService: EventService,
    private dateTimeService: DateTimeService,
    private router: Router// Inject Router
  ) {}
  ngOnInit():void{
    const userString = localStorage.getItem('loginInfo');
    this.userObject = userString ? JSON.parse(userString) : null;
   
    if(this.userObject){
      if(this.userObject.role==='user'){
        this.router.navigate(['/home']);
      }
    }
    else{
      this.router.navigate(['/home']);
    }
  }

  
  toggleForm() {

    this.isShowEvents = false;
    this.myEvent = {} as AppEvent;
    this.formattedDate = "";
    this.formattedTime = "";
    this.isEventFormVisible = true;
  }
  
  toggleShowEvents() {
    this.isEventFormVisible = false;
    this.isShowEvents = true;

    this.showEvents();

  }
  showEvents(){
    this.eventService.getEvents().subscribe(
      (response: any) => {
        this.events = response;
        console.log(this.events);
        // console.log(response);
      },
      (error: any) => {
        console.log(error);
        alert(error.statusText);
      });
  }
 

  onSubmit(eventForm: NgForm) {
    console.log(eventForm.value);
    if (eventForm.valid) {
      const { name, image, url, date, time, description, location, category, id } = eventForm.value;


      const eventDateTime = new Date(`${date}T${time}`);
      if (!id) {
        const newEvent = new AppEvent(
          id,
          name,
          image,
          url,
          eventDateTime,
          description,
          location,
          category
        );
        this.eventService.createEvent(newEvent).subscribe(
          (response: any) => {
            this.isEventFormVisible = false;
            eventForm.reset(); 
          },
          (error: any) => {
            console.log(error);
            alert(error.statusText);
          }
        );
      }
      else {
        const newEvent = new AppEvent(
          id,
          name,
          image,
          url,
          eventDateTime,
          description,
          location,
          category
        );
        this.eventService.updateEvent(newEvent).subscribe(
          (response: any) => {
            this.isEventFormVisible = false;
          },
          (error: any) => {
            alert(error.statusText);
          }
        );
      }
    } else {
      
      Object.keys(eventForm.controls).forEach(control => {
        eventForm.controls[control].markAsTouched();
      });
    }
  }


  updateEvent(event: AppEvent) {
  
    this.isShowEvents = false;
    this.isEventFormVisible = true;
    const { date } = event;
    const dateTime = new Date(date);
  // In your component
 this.formattedDate = this.dateTimeService.calDate(dateTime);
console.log(this.formattedDate); // Outputs: YYYY-MM-DD

    this.formattedTime=this.dateTimeService.calTime(dateTime);
    this.myEvent = event;
    console.log(this.myEvent);
    
   
  }
  

  deleteEvent(id:string){
    this.eventService.deleteEvent(id).subscribe(
      (response: any) => {
       console.log(response);
       this.toggleShowEvents();
        
      },
      (error: any) => {
        console.log(error);
        alert(error.statusText);
      }
    );
  }
}

