<template>
    <div id="resumeEditor">
        <!--<p>{{ $t("message.hello") }}</p>-->
        <nav>
            <ol>
                <li v-for="(item,index) in resume.config" :class="{active: item.field === selected}"
                    @click="selected = item.field">
                    <svg class="icon" :class="item.field === selected? 'qunimei': 'wocao'">
                        <use :xlink:href="`#icon-${item.icon}`"></use>
                    </svg>
                </li>
            </ol>
        </nav>
        <ol class="panels">
            <li v-for="item in resume.config" v-show="item.field === selected">
                <!--「需要判断数据是Array或Object」-->
                <div v-if="resume[item.field] instanceof Array">
                    <div class="subitem" v-for="(subitem,i) in resume[item.field]" >

                        <div class="resumeField" v-for="(value,key) in subitem">
                            <label>{{$t(`resume.${item.field}.${key}`)}} </label>
                            <input type="text" :value="value"
                                   @input="changeResumeField(`${item.field}.${i}.${key}`, $event.target.value)"
                            >
                        </div>
                        <button class="delThis" @click="delResumeSubfield(`${item.field}.${i}`)">删除</button>
                        <hr>

                    </div>
                    <button class="addNew" @click="addResumeSubfield(item.field)">新增</button>
                </div>
                <div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
                    <label> {{$t(`resume.profile.${key}`)}}</label>
                    <input type="text" :value="resume[item.field][key]"
                           @input="changeResumeField(`${item.field}.${key}`, $event.target.value)"
                    >
                </div>
            </li>
        </ol>
    </div>
</template>

<script>
    export default {
        name: 'ResumeEditor',
        computed: {
            selected: {
                get(){
                    return this.$store.state.selected
                },
                set(value) {
                    return this.$store.commit('switchTab', value)
                }
            },
            resume (){
                return this.$store.state.resume
            }
        },
        methods: {
            changeResumeField (path, value) {
                return this.$store.commit('updateResume', {path, value})
            },
            addResumeSubfield (field) {
                this.$store.commit('addResumeSubfield',{field})
            },
            delResumeSubfield(path){
                // 『 BUG - 发现如果删完整个人都不好了 』
                this.$store.commit('delResumeSubfield',{path})
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    #resumeEditor {
        background: #ffffff;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: row;
        overflow: auto;
        > nav {
            min-width: 80px;
            background: black;
            color: white;
            > ol {
                > li {
                    height: 48px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 16px;
                    margin-bottom: 16px;
                    &.active {
                        background: white;
                    }
                }
            }
        }
        > .panels {
            flex-grow: 1;
            > li {
                padding: 24px;
            }
        }
        svg.icon {
            width: 24px;
            height: 24px;
        }
    }

    .wocao {
        fill: white;
    }

    .qunimei {
        fill: black;
    }

    ol {
        list-style: none;
    }

    .resumeField {
        > label {
            display: block;
        }
        input[type=text] {
            margin: 16px 0;
            border: 1px solid #ddd;
            box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.25);
            width: 100%;
            height: 40px;
            padding: 0 8px;
        }
    }

    hr {
        border: none;
        border-top: 1px solid #ddd;
        margin: 24px 0;
    }

    button.addNew {
        background-color: #f2510f;
        padding: 5px;
        border: none;
        color: white;
    }
</style>