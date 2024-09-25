import { Event as AppEvent } from '../ApiServices/event/event.service';
export class BookedEventByUser {
    constructor(
        public id: string,
        public ticketCost: number,
        public no_of_tickets: number,
        public status: boolean,
        public eventId: string,
        public eventdto: AppEvent = new AppEvent('', '', '', '', new Date(), '', '', ''),
        public userId: string
    ) {
        // this.id = id;
        // this.eventId = eventId;
        // this.no_of_tickets = no_of_tickets;
        // this.ticketCost = ticketCost;
        // this.status = status;
        // this.username=username;
    }
}