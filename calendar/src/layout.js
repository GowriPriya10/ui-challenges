import { getCurrentDate, getNoOfDaysInMonth, startingDayOfMonth, days, getPrevMonthDetails, getNextMonthDetails }from './date';

export default class CalendarLayout {
    constructor () {
        this.calendarGrid = document.getElementById('calendar-grid');
        this.options = document.getElementById('option-select');
        this.currentDate = getCurrentDate();

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
            cell.querySelector('.cell').id = i+1;
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

    destroyCalendarCells() {
        this.calendarGrid.replaceChildren();
    }

}
