import View from './View.js'

const tag = '[TodoView]'

const TodoView = Object.create(View)

TodoView.setup = function (el) {
    this.init(el)
    this.inputEl = el.querySelector('[type=text]')
    this.resetEl = el.querySelector('[type=reset]')
    this.tableEl = el.querySelector('#todoTable')
    this.showResetBtn(false)
    this.bindEvents()
    return this
}

TodoView.render = function(data = []) {
    console.log(data)
    this.el.innerHTML += data.length ? this.makeTodoHtml(data) : this.messages.NO_KEYWORDS
    this.show()
}

TodoView.makeTodoHtml = function(data) {

}

TodoView.showResetBtn = function (show = true) {
    this.resetEl.style.display = show ? 'block' : 'none'
}

TodoView.bindEvents = function () {
    this.on('submit', e => e.preventDefault())
    this.inputEl.addEventListener('keyup', e => this.onKeyup(e))
    this.resetEl.addEventListener('click', e => this.onClickReset())
}

TodoView.onKeyup = function (e) {
    const enter = 13
    this.showResetBtn(this.inputEl.value.length)
    if (!this.inputEl.value.length) this.emit('@reset')
    if (e.keyCode !== enter) return
    this.emit('@submit', { input: this.inputEl.value })
}

TodoView.onClickReset = function () {
    this.emit('@reset')
    this.showResetBtn(false)
}

TodoView.setValue = function (value = '') {
    this.inputEl.value = value
    this.showResetBtn(this.inputEl.value.length)
}

export default TodoView