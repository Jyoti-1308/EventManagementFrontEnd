import { Component, OnInit } from '@angular/core';
import { category } from '../categories';
import { Event as AppEvent, EventService } from '../../ApiServices/event/event.service';
import { DateTimeService } from '../../ApiServices/dateTime/date-time.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events: AppEvent[] = [];
  sortOrder: string = "";
  filteredEvents: AppEvent[] = [];
  selectedCategories: string[] = [];
  filterForm: FormGroup;
  categories = category;

  constructor(private eventService: EventService,
    private dateTimeService: DateTimeService,
    private router: Router,
    private fb: FormBuilder) {
    this.filterForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.showEvents();
   
    
  }

  calulateDate(date: Date): string {
    return this.dateTimeService.calDate(new Date(date));
  }

  showEvents() {
    this.eventService.getEvents().subscribe(
      (response: any) => {
        this.events = response;
        this.filteredEvents = response;
      },
      (error: any) => {
        console.log(error);
        alert(error.statusText);
      });
  }

  openEvent(id: string) {
    this.router.navigate(['/events', id]);
  }

  onClearFilters() {
    // Clear the selected categories
    this.selectedCategories = [];

    // Reset filtered events to show all events
    this.filteredEvents = this.events;
    this.sortOrder = "";
    // Reset the form if necessary
    this.filterForm.reset();
  }

  onCheckboxChangeEvent(category: string, event1: Event) {
    const input = event1.target as HTMLInputElement; // Type assertion here
    this.onCheckboxChange(category, input.checked);
  }

  onCheckboxChange(cat: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedCategories.push(cat);
    } else {
      const index = this.selectedCategories.indexOf(cat);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    }

    this.filteredEvents = this.events.filter(event =>
      this.selectedCategories.includes(event.category)
    );
  }
  sortEvents() {
    if (this.sortOrder === 'ascending') {
      this.filteredEvents.sort((a, b) => {
        const date1 = new Date(a.date);
        const date2 = new Date(b.date);

        return date1.getTime() - date2.getTime();
      });
    }
    else {
      this.filteredEvents.sort((a, b) => {
        const date1 = new Date(a.date);
        const date2 = new Date(b.date);
        return date2.getTime() - date1.getTime();
      });
    }
  }
}
