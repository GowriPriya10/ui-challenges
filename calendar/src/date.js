export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function getCurrentDate() {
    const now = new Date();
    const current = {
        date: now.getDate(),
        month: months[now.getMonth()],
        year: now.getFullYear(),
        day: days[now.getDay()]
    }

    return current;
}

export function getNoOfDaysInMonth(year, month) {
    return new Date(year, months.indexOf(month)+1, 0).getDate();
}

export function startingDayOfMonth(year, month) {
    return new Date(year, months.indexOf(month), 1).getDay();
}

export function getPrevMonthDetails(year, month) {
    const prevMonth = months.indexOf(month) === 0 ? new Date(year - 1, 11, 1) : new Date(year, months.indexOf(month) - 1, 1);
    return {
        date: prevMonth.getDate(),
        month: months[prevMonth.getMonth()],
        year: prevMonth.getFullYear(),
        day: days[prevMonth.getDay()]
    }
}

export function getNextMonthDetails(year, month) {
    const nextMonth = months.indexOf(month) === 11 ? new Date(year + 1, 0, 1) : new Date(year, months.indexOf(month) + 1, 1);
    return {
        date: nextMonth.getDate(),
        month: months[nextMonth.getMonth()],
        year: nextMonth.getFullYear(),
        day: days[nextMonth.getDay()]
    }
}