/* eslint-disable require-jsdoc */
const calendar = document.getElementById('calendar');
const calendarWeek = document.getElementById('calendarWeek');
const calendarYM = document.getElementById('calendarYM');
const term = document.getElementsByClassName('term');
let today = new Date();

function makeCal() {
    buildCalendar(today);
    buildCalendarWeek(today)
    calendar.addEventListener('click', clickCalendar);
    for (const i of term) i.addEventListener('click', clickTerm);
}

function clickTerm(e) {
    if (e.target.innerText === '주간') {
        calendar.style.display = 'none';
        calendarWeek.style.display = '';
    } else {
        calendar.style.display = '';
        calendarWeek.style.display = 'none';
    }
}
function clickCalendar(e) {
    if (e.target.innerText === '>') {
        today = new Date(today.getFullYear(),
            today.getMonth() + 1,
            today.getDate());
        buildCalendar(today);
    } else if (e.target.innerText === '<') {
        today = new Date(today.getFullYear(),
            today.getMonth() - 1,
            today.getDate());
        buildCalendar(today);
    } else if ((e.target.innerText + 0) > 1) {
        alert(e.target.innerText + '일을 클릭하셨습니다.');
    }
}

function buildCalendarWeek(target) {
    const year = target.getFullYear();
    const month = target.getMonth();
    const day = target.getDay()
    const date = target.getDate() - day
    var StartDate = new Date();
    var EndDate = new Date();
    StartDate.setHours(0,0,0,0); EndDate.setHours(0,0,0,0);
    StartDate.setDate(target.getDate() - day);
    EndDate.setDate(target.getDate()- day + 6);
    
    console.log(StartDate, EndDate)

    calendarWeekYM.innerHTML = year +
        '년 ' + (month + 1) + '월';

}
function buildCalendar(today) {
    const date = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const doMonth = new Date(year, month, 1);
    const doMonthLastDate = new Date(year, month, 0);
    const lastDate = new Date(year, month + 1, 0);
    const doMonthLastDay = doMonthLastDate.getDate();
    calendarYM.innerHTML = year +
        '년 ' + (month + 1) + '월';

    while (calendar.rows.length > 2) {
        calendar.deleteRow(calendar.rows.length-1);
    }

    let td = null;
    let tr = null;
    let cnt = 0;
    tr = calendar.insertRow();

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
            tr = calendar.insertRow();
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

function init() {
    makeCal();
}

export default {
    init,
};
