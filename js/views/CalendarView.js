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
}

CalendarView.render = function(data = []) {
    this.show()
    this.buildCalendar(this.today,data)
    this.buildCalendarWeek(this.today,data)
    this.calendarMonth.addEventListener('click', e => this.clickCalendar(e, data));
    for (const i of this.term) i.addEventListener('click', e => this.clickTerm(e));
}

CalendarView.clickTerm = function(e) {
    if (e.target.innerText === '주간') {
        calendarMonth.style.display = 'none';
        calendarWeek.style.display = '';
    } else {
        calendarMonth.style.display = '';
        calendarWeek.style.display = 'none';
    }
}
CalendarView.clickCalendar = function(e, data) {
    if (e.target.innerText === '>') {
        this.today = new Date(this.today.getFullYear(),
        this.today.getMonth() + 1, 
        this.today.getDate());
        this.buildCalendar(this.today,data);
    } else if (e.target.innerText === '<') {
        this.today = new Date(this.today.getFullYear(),
        this.today.getMonth() - 1,
        this.today.getDate());
        this.buildCalendar(this.today,data);
    } else if ((e.target.innerText + 0) > 1) {
        alert(e.target.innerText + '일을 클릭하셨습니다.');
    }
}

CalendarView.buildCalendarWeek = function(target) {
    const year = target.getFullYear();
    const month = target.getMonth();
    const day = target.getDay()
    const date = target.getDate() - day
    var StartDate = new Date();
    var EndDate = new Date();
    StartDate.setHours(0,0,0,0); EndDate.setHours(0,0,0,0);
    StartDate.setDate(target.getDate() - day);
    EndDate.setDate(target.getDate()- day + 6);

    calendarWeekYM.innerHTML = year +
        '년 ' + (month + 1) + '월';

}
CalendarView.buildCalendar = function(today, data) {
    const date = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const doMonth = new Date(year, month, 1);
    const doMonthLastDate = new Date(year, month, 0);
    const lastDate = new Date(year, month + 1, 0);
    const doMonthLastDay = doMonthLastDate.getDate();
    this.calendarYM.innerHTML = year +
        '년 ' + (month + 1) + '월';

    while (this.calendarMonth.rows.length > 2) {
        this.calendarMonth.deleteRow(this.calendarMonth.rows.length-1);
    }
    let td = null;
    let tr = null;
    let cnt = 0;
    tr = calendarMonth.insertRow();
    console.log(data)
    for (let i = doMonth.getDay(); i > 0; i--) {
        td = tr.insertCell();
        td.innerHTML = doMonthLastDay - (i - 1);
        td.style.color = '#ddd';
        td.style.verticalAlign = 'top';
        td.style.textAlign = 'left';
        if (cnt === 0) td.style.color = '#F79DC2';
        cnt = cnt + 1;
    }

    for (let i = 1; i <= lastDate.getDate(); i++) {
        td = tr.insertCell();
        td.style.verticalAlign = 'top';
        td.style.textAlign = 'left';
        td.innerHTML = i;
        cnt = cnt + 1;
        if (cnt % 7 == 1) {
            td.style.color = 'red';
            td.innerHTML = i;
        }
        if (cnt%7 == 0) {
            td.style.color = 'blue';
            td.innerHTML = i;
            tr = calendarMonth.insertRow();
            tr.style.verticalAlign = 'top';
            tr.style.textAlign = 'left';
        }
        if (year === date.getFullYear() &&
            month === date.getMonth() &&
            i === date.getDate()) {
            td.style.backgroundColor = '#84c8f9';
        }
    }
    if (tr.childElementCount != 0) {
        let dayCnt = 1;
        let cnt = tr.childElementCount;
        while (cnt < 7) {
            td = tr.insertCell();
            td.innerHTML = dayCnt;
            td.style.color = '#ddd';
            dayCnt++;
            cnt++;
            if (cnt === 7) td.style.color = 'skyblue';
        }
    }
}

export default CalendarView