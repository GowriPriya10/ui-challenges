export const days = ['sun', 'mon', 'tue', 'wed', 'thurs', 'fri', 'sat'];

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
