<template>
    <div>
        <div id="log_stack_detail">
            <HeadBar :toPage="'LogDetail'" :toParam="{'day': day, 'tit': titleTxt, 'lvl': lvl}" :title="'堆栈信息'"></HeadBar>
            <table id="stack_trace_tb">
                <ul class="stack_item" v-for="(item, index) in stackTrace()" :key="index">
                    <img src="../assets/arrow.svg" alt="up">
                    <div><b>类路径：</b>{{item.packagePath}}</div>
                    <div class="pos_stack_txt"><b>位置：</b>{{item.position}}</div>
                </ul>
            </table>
        </div>
    </div>
</template>

<script>
import HeadBar from './component/HeadBar.vue'

export default {
    components: {
        HeadBar
    },
    data() {
        return {
            titleTxt: this.$route.params.tit,
            logInfo: this.$route.params.logInfo,
            itemNum: this.$route.params.itemNum,
            lvl: this.$route.params.lvl,
            day: this.$route.params.day
        }
    },
    methods: {
        stackTrace() {
            return this.logInfo.unknown[this.itemNum].stackTrace;
        }
    },
}
</script>

<style lang="scss">
    .pos_stack_txt {
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px dashed rgb(151, 151, 151);
        color: rgb(27, 167, 132);
    }
    #stack_trace_tb {
        display: block;
        margin: 120px 5% 0 5%;
    }
    .stack_item {
        position: relative;
        word-wrap: break-word;
        margin-bottom: 15px;
        box-shadow: 0 0 5px rgb(223, 223, 223);
        border-radius: 12px;
        padding: 30px 12px 15px 12px;
        line-height: 20px;
        color: rgb(170, 170, 170);
        text-align: left;
    }
    .stack_item div b {
        color: rgb(73, 73, 73);
    }
    .stack_item img {
        position: absolute;
        width: 25px;
        top: 5px;
        right: 10px;
    }
</style>