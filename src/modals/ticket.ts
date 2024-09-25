
export class Ticket {
    constructor(
        public id: number,
      
        public ticketCost: number,
        public no_of_tickets: number,
        public status: boolean,
        public eventId: string,
      
        public userId:string
    ) {
        // this.id = id;
        // this.eventId = eventId;
        // this.no_of_tickets = no_of_tickets;
        // this.ticketCost = ticketCost;
        // this.status = status;
        // this.username=username;
    }
}