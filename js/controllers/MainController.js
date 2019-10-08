import ClockView from '../views/ClockView.js'
import WeatherView from '../views/WeatherView.js'
import WeatheView from '../views/WeatherView.js'
import TabView from '../views/TabView.js'
import TodoView from '../views/TodoView.js'
import CalendarView from '../views/CalendarView.js'

import TodoListModel from '../models/TodoListModel.js'

const tag = '[MainController]'

export default {
  init() {
    ClockView.setup(document.getElementById('clock'))
    
    WeatherView.setup(document.getElementById('weather'))

    TabView.setup(document.getElementById('tabs'))
      .on('@change', e => this.onChangeTab(e.detail.tabName))

    TodoView.setup(document.getElementById('todo'))
      .on("@submit", e => this.onSubmit(e.detail.input))
      .on("@reset", e => this.onResetForm())

    CalendarView.setup(document.getElementById('calendar'))

    this.selectedTab = 'Todo'
    this.renderView()
  },

  renderView() {
    TabView.setActiveTab(this.selectedTab);

    if (this.selectedTab === "Todo") {
      this.fetchTodoKeyword()
      CalendarView.hide()
    } else {
      this.fetchTodoKeyword()
      TodoView.hide()
    }
  },

  fetchTodoKeyword() {
    TodoListModel.list().then(data => {
      if(this.selectedTab === "Todo") TodoView.render(data)
      else CalendarView.render(data)
    })
  },

  submit(query) {
    TodoView.setValue(query)
    TodoListModel.add(query)
  },

  onChangeTab(tabName) {
    this.selectedTab = tabName
    this.renderView();
  },

  onSubmit(input) {
    console.log(tag, "onSubmit()", input);
    this.submit(input);
  },

  onResetForm() {
    console.log(tag, "onResetForm()");
    this.renderView();
  },
}