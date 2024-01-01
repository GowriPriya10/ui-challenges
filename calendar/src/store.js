export default class EventStore {
    constructor() {
        this.event_store = {};

        this.initStore();
    }

    initStore() {
        if(window.localStorage.getItem('events')) {
            this.event_store = JSON.parse(window.localStorage.getItem('events'));
        }
    }

    saveEvent(event) {
        this.saveToGlobal(event);
        
        window.localStorage.setItem('events', JSON.stringify(this.event_store))
    }

    saveToGlobal(event) {
        for(const eventDate in this.event_store) {
            if(eventDate === event.eventDate) {
                this.event_store[eventDate].push(event);
                return;
            }
        }
        this.event_store[event.eventDate] = [event];
    }

    getAllEvents(date) {
        return this.event_store[date];
    }
}
