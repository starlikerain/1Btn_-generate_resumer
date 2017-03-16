<template>
    <div>
        <div class=page>
            <header>
                <Topbar/>
            </header>
            <main>
                <ResumeEditor/>
                <ResumePreview/>
            </main>
        </div>
        <Dialog/>
    </div>
</template>

<script>
    import 'normalize.css/normalize.css'
    import './assets/reset.css'

    import Topbar from './components/Topbar'
    import ResumeEditor from './components/ResumeEditor'
    import ResumePreview from './components/ResumePreview'
    import icons from './assets/icons'
    //「想要全局数据」
    import store from './store/index'
    import AV from './lib/leancloud'
    import getAVUser from './lib/getAVUser'

    export default {
        name: 'app',
//        data () {
//            return {
//                text: '안녕하십니까'
//            }
//        },
        store,
        components: {Topbar, ResumeEditor, ResumePreview},
        created(){
            document.body.insertAdjacentHTML('afterbegin', icons)
            let state = localStorage.getItem('state')
            if (state) {
                console.log('app.vue exist immediately')
                state = JSON.parse(state)
            }
//            『先不让存储』
            this.$store.commit('initState', state)
            this.$store.commit('setUser', getAVUser())
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .page {
        height: 100vh;
        display: flex;
        flex-direction: column;
        background: #EAEBEC;
        > main {
            flex-grow: 1;
        }
        > main {
            min-width: 1024px;
            max-width: 1440px;
            margin-top: 16px;
            margin-bottom: 16px;
            display: flex;
            justify-content: space-between;
            padding: 0 16px;
            width: 100%;
            align-self: center;
        }
    }

    #resumeEditor {
        min-width: 35%;
        background: #444;
    }

    #resumePreview {
        flex-grow: 1;
        margin-left: 16px;
        background: #777;
    }
</style>