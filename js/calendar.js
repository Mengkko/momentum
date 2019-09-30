const calendar = document.getElementById("calendar");
const calendarYM = document.getElementById("calendarYM");

function init() {
    makeCal()
}

function makeCal() {
    buildCalendar()
    calendar.addEventListener('click', clickCalendar)
}

function buildCalendar() {
    var today = new Date();
    var date = new Date();
    var doMonth = new Date(today.getFullYear(),today.getMonth(),1);
    var lastDate = new Date(today.getFullYear(),today.getMonth()+1,0);
    calendarYM.innerHTML = today.getFullYear() + "년 " + (today.getMonth() + 1) + "월"; 

    while (calendar.rows.length > 2) {
        calendar.deleteRow(calendar.rows.length-1);
    }

    var cell = null;
    var row = null;
    row = calendar.insertRow();
    var cnt = 0;

    for (let i=0; i<doMonth.getDay(); i++) {
          cell = row.insertCell();
          cnt = cnt + 1;
     }

    for (let i=1; i<=lastDate.getDate(); i++) { 
        cell = row.insertCell();
        cell.innerHTML = i;
        cnt = cnt + 1;
        if (cnt % 7 == 1) {
            cell.innerHTML = "<font color=#F79DC2>" + i
        }    
        if (cnt%7 == 0){
            cell.innerHTML = "<font color=skyblue>" + i
            row = calendar.insertRow();
        }
        if (today.getFullYear() === date.getFullYear()
            && today.getMonth() === date.getMonth()
            && i == date.getDate()) {
        cell.bgColor = "#FAF58C";
        }
    }
}
function clickCalendar(e) {
    if(e.target.innerText === ">") {
        alert("다음달")
    } else if(e.target.innerText === "<") {
        alert("이전달")
    } else if((e.target.innerText + 0) > 1){
        alert(e.target.innerText + '일을 클릭하셨습니다.')
    }
}
export default {
    init,
};
