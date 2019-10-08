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
        const date = '12.31'
        if(this.data) {
            if (this.data.some(item => item.keyword === keyword)) {
                this.remove(keyword)
            }
        } else {
            
        }
        this.data = [{keyword, date}, ...this.data]
        localStorage.clear()
        localStorage.setItem('toDos', JSON.stringify(this.data))
    },

    remove(keyword) {
        this.data = this.data.filter(item => item.keyword !== keyword)
    }
}