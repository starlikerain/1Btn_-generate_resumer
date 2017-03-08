/**
 * Created by StarLikeRain on 25/02/2017.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import objectPath from "object-path"


Vue.use(Vuex) // 不写这句话浏览器控制台就会报错，于是我就写了

export default new Vuex.Store({
    state: {
        selected: 'profile',
        user: {
            id: '',
            username: ''
        },
        resume: {
            config: [
                { field: 'profile', icon: 'id' },
                { field: 'workHistory', icon: 'work' },
                { field: 'education', icon: 'book' },
                { field: 'projects', icon: 'heart' },
                { field: 'awards', icon: 'cup' },
                { field: 'contacts', icon: 'phone' },
            ],
            profile: {
                name: '',
                city: '气球',
                title: '一个不合格的不全栈工程师',
                birthday: '1995-08-29'
            },
            workHistory: [
                {
                    company: '旧概念', content: `公司总部设在XXXX区`
                }
            ],
            education: [
                { school: '三里屯', content: '本科' }
            ],
            projects: [
                { name: 'project A', content: '文字' }
            ],
            awards: [
                { name: '再来十瓶', content: '连续十次获得「再来一瓶」奖励' }
            ],
            contacts: [
                { contact: 'phone', content: '13812345678' }
            ],
        },
        resumeConfig: [
            {field: 'profile', icon: 'id', keys: ['name', 'city', 'title', 'birthday']},
            {field: 'workHistory', icon: 'work', keys: ['company', 'content']},
            {field: 'education', icon: 'book', keys: ['school', 'content']},
            {field: 'projects', icon: 'heart', keys: ['name', 'content']},
            {field: 'awards', icon: 'cup', keys: ['name', 'content']},
            {field: 'contacts', icon: 'phone', keys: ['contact', 'content']}
        ]
    },
    mutations: {
        initState(state, payload){
            Object.assign(state, payload)
        },
        switchTab(state, payload) {
            state.selected = payload // 关于 payload 看这里 http://vuex.vuejs.org/zh-cn/mutations.html#提交载荷（payload）
            localStorage.setItem('state', JSON.stringify(state))
        },
        updateResume(state, {path, value}){
            objectPath.set(state.resume, path, value)
            localStorage.setItem('state', JSON.stringify(state))
        },
        setUser(state, payload){
            Object.assign(state.user, payload)
        },
        removeUser(state){
            state.user.id = null
        },
        addResumeSubfield(state, {field}) {
            let empty = {}
            state.resume[field].push(empty)
            state.resumeConfig.filter((i) => i.field === field)[0].keys.map((key) => {
                Vue.set(empty, key, '')
            })
        }
    }
})