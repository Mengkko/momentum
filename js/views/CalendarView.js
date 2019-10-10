import View from './View.js'

const tag = '[CalendarView]'

const CalendarView = Object.create(View)

CalendarView.setup = function (el) {
    this.init(el)
    this.calendarMonth = document.getElementById('calendarMonth');
    this.calendarWeek = document.getElementById('calendarWeek');
    this.calendarYM = document.getElementById('calendarYM');
    this.term = document.getElementsByClassName('term');
    this.today = new Date();
    buildCalendar(this.today)
    buildCalendarWeek(this.today)
}

CalendarView.render = function(data = []) {
    this.show()
}
export default CalendarView