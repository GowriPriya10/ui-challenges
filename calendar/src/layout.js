import { getCurrentDate, getNoOfDaysInMonth, startingDayOfMonth, days, getPrevMonthDetails, getNextMonthDetails }from './date';

export default class CalendarLayout {
    constructor (eventStore) {
        this.calendarGrid = document.getElementById('calendar-grid');
        this.options = document.getElementById('option-select');
        this.currentDate = getCurrentDate();
        this.eventWrapper = document.querySelector('.event-wrapper');
        this.eventStore = eventStore;

        this.initCalendarLayout();
        this.initListeners();
    }

    initCalendarLayout() {
        console.log(this.currentDate);
    
        this.buildCalendarCells(this.currentDate);
    }

    buildCalendarCells(date){

        document.querySelector('#month').replaceChildren(`${date.month}`);
        document.querySelector('#year').replaceChildren(`${date.year}`);
        
        this.addDayCells();
        this.buildDateCells(date);
    }

    addDayCells() {
        days.forEach(day => {
            const dayCell = document.querySelector('#day-cell').content.cloneNode(true);
            dayCell.querySelector('.calendar-days > span').textContent = day;
            this.calendarGrid.appendChild(dayCell);
        })
    }

    buildDateCells(date){
        const noOfDays = getNoOfDaysInMonth(date.year, date.month);
        const startingDay = startingDayOfMonth(date.year, date.month);
    
        this.addOmitCells(startingDay);

        for(let i = 0; i < noOfDays; i++) {
            const cell = document.querySelector('#calendar-cell').content.cloneNode(true);
            cell.querySelector('.cell').id = `${i+1}-${date.month}-${date.year}`;
            cell.querySelector('.cell > span').textContent = i+1;
            if(this.currentDate.date === i+1 && this.currentDate.month === date.month && this.currentDate.year === date.year) {
                cell.querySelector('.cell').classList.add('today');
            }
            this.calendarGrid.appendChild(cell);
        }
    }

    addOmitCells(startingDay) {
        let i = 0;
        while(i < startingDay) {
            const cell = document.querySelector('#calendar-cell').content.cloneNode(true);
            cell.querySelector('.cell').classList.add('omit-cell');
            cell.querySelector('.cell').removeAttribute('title');
            this.calendarGrid.appendChild(cell);
            i++;
        }
    }

    initListeners() {
        this.optionSelectListener();

        this.calendarCellListener();

        this.eventWrapperListener();
    }

    optionSelectListener() {
        this.options.addEventListener('click', (e) => {
            const target = e.target.id;
        
            const month = document.querySelector('#month').textContent;
            const year = parseInt(document.querySelector('#year').textContent);
        
            let dateDetails = null;
        
            if((this.currentDate.month !== month || this.currentDate.year !== year) && target === 'today') {
                dateDetails = this.currentDate;
            }else {
                if(target === 'prev') {
                    dateDetails = getPrevMonthDetails(year, month);
                }
                if(target === 'next') {
                    dateDetails = getNextMonthDetails(year, month);
                }
            }

            if(dateDetails) {
                this.destroyCalendarCells();
                this.buildCalendarCells(dateDetails);
            }

        })
    }

    calendarCellListener() {
        this.calendarGrid.addEventListener('click', (e) => {
            if(e.target.classList.contains('cell') && !e.target.classList.contains('omit-cell')){
                this.eventWrapper.classList.add('show');
                const dateClicked = e.target.id;
                const eventForm = document.querySelector('#event-template').content.cloneNode(true);
                eventForm.querySelector('#event-date > span').textContent = dateClicked;
                this.eventWrapper.querySelector('#event-container').replaceChildren(eventForm);
                this.renderEventsList(dateClicked);
            }
            return;
        })
    }

    eventWrapperListener() {
        this.eventWrapper.addEventListener('click', (e) => {
            if(e.target.name === 'save-event'){
                const eventTitle = document.querySelector('#title > span').textContent;
                const eventDescription = document.querySelector('#event-description > span').textContent;
                const eventDate = document.querySelector('#event-date > span').textContent;
                
                const event = {
                    eventTitle,
                    eventDescription,
                    eventDate
                };

                this.eventStore.saveEvent(event);
                this.renderEventCell(event, this.eventWrapper.querySelector('#event-container > #events-list'));
                document.querySelector('#title > span').textContent = 'Your Event Title...';
                document.querySelector('#event-description > span').textContent = 'Your Event Description...';
            }

            if(e.target.id === 'close') {
                this.eventWrapper.classList.remove('show');
            }
        })
    }

    renderEventsList(date) {
        const events = this.eventStore.getAllEvents(date);
        const node = this.eventWrapper.querySelector('#event-container > #events-list');
        node.replaceChildren();
        if(events) {
            events.forEach((event) => {
                this.renderEventCell(event, node);
            })
        }
    }

    renderEventCell(event, node) {
        const eventCell = document.getElementById('event-list-cell').content.cloneNode(true);
        eventCell.querySelector('#event-cell > .title').textContent = event.eventTitle;
        eventCell.querySelector('#event-cell > .desc').textContent = event.eventDescription;
        node.appendChild(eventCell);
    }

    destroyCalendarCells() {
        this.calendarGrid.replaceChildren();
    }

}
