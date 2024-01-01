import '../style.css';
import CalendarLayout from './layout';
import EventStore from './store';

const eventStore = new EventStore();
const calendarLayout = new CalendarLayout(eventStore);
