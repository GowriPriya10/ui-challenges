import '../style.css';
import { getCurrentDate, getNoOfDaysInMonth, startingDayOfMonth, days }from './date';

const mydetails = document.getElementById('month-year');
const calendarGrid = document.getElementById('calendar-grid');

function initCalendarLayout() {
    const currentDate = getCurrentDate();
    console.log(currentDate);

    mydetails.replaceChildren(`${currentDate.month} - ${currentDate.year}`);
    
    buildCells(currentDate);
}

function buildCells(currentDate){
    const noOfDays = getNoOfDaysInMonth(currentDate.year, currentDate.month);
    const startingDay = startingDayOfMonth(currentDate.year, currentDate.month);

    addOmitCells(startingDay);
    for(let i = 0; i < noOfDays; i++) {
        const cell = document.querySelector('#calendar-cell').content.cloneNode(true);
        cell.querySelector('.cell').id = i+1;
        cell.querySelector('.cell > span').textContent = i+1;
        if(currentDate.date === i+1) {
            cell.querySelector('.cell').classList.add('today');
        }
        calendarGrid.appendChild(cell);
    }
}


function addOmitCells(startingDay) {
    let i = 0;
    while(i < startingDay) {
        const cell = document.querySelector('#calendar-cell').content.cloneNode(true);
        cell.querySelector('.cell').classList.add('omit-cell');
        cell.querySelector('.cell').removeAttribute('title');
        calendarGrid.appendChild(cell);
        i++;
    }
}

initCalendarLayout();