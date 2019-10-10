import View from './View.js'

const tag = '[TodoView]'

const TodoView = Object.create(View)

TodoView.setup = function (el) {
    this.init(el)
    this.inputEl = el.querySelector('[type=text]')
    this.tableEl = el.querySelector('#todoTable')
    this.bindEvents()
    return this
}

TodoView.render = function(data = []) {
    if(data.length) this.tableEl.innerHTML = '<tr><th>날짜</th><th>제목</th><th>삭제</th></tr>' + this.getTodoResultHtml(data)
    else this.tableEl.innerHTML = ''
    Array.from(this.el.querySelectorAll('button')).forEach(el => {
        el.addEventListener('click', e => this.clickDeleteBtn(e))
    });
    this.show()
}

TodoView.getTodoResultHtml = function(data) {
    return data.reduce((html, item) => {
        html += this.getTodoItemHtml(item)
        return html
    }, '<tbody>') + '</tbody>'
}

TodoView.getTodoItemHtml = function(item,idx) {
    return `<tr><input type="hidden" value="${item.cnt}"><td>${item.date}</td>
        <td>${item.keyword}</td>
        <td><button>❎</button></td></tr>`
}

TodoView.bindEvents = function () {
    this.on('submit', e => e.preventDefault())
    this.inputEl.addEventListener('keyup', e => this.onKeyup(e))
}

TodoView.onKeyup = function (e) {
    const enter = 13
    if (e.keyCode !== enter) return
    this.emit('@submit', { input: this.inputEl.value })
}

TodoView.clickDeleteBtn = function (e) {
    this.emit('@remove', { input: e.target.parentElement.parentElement.children[0] })
}


TodoView.setValue = function () {
    this.inputEl.value = ''
}

export default TodoView