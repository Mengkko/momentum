export default {
    data : [],

    list() {
        const localData = JSON.parse(localStorage.getItem('toDos'))
        if(localData) this.data = localData
        return Promise.resolve(this.data)
    },

    add(keyword = '') {
        keyword = keyword.trim()
        if (!keyword) return

        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        if(month < 10) month = "0" + month
        if(day < 10) day = "0" + day
        const today = year + "-" + month + "-" + day

        const cnt = this.data.length + ""
        this.data = [{keyword, date : today, cnt}, ...this.data]
        localStorage.clear()
        localStorage.setItem('toDos', JSON.stringify(this.data))
    },

    remove(cnt) {
        this.data = this.data.filter(item => item.cnt !== cnt)
        localStorage.clear()
        localStorage.setItem('toDos', JSON.stringify(this.data))
    }
}