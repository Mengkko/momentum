import View from './View.js'

const tag = '[CalendarView]'

const CalendarView = Object.create(View)

CalendarView.setup = function (el) {
    this.init(el)
}

CalendarView.render = function(data = []) {
    this.show()
}
export default CalendarView