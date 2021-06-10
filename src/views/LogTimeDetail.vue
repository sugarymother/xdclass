<template>
    <div>
        <div id="log_time_detail">
            <HeadBar :toPage="'LogDetail'" :toParam="{'day': day, 'tit': titleTxt, 'lvl': lvl}" :title="'详细时间'"></HeadBar>
            <table id="time_item_tb">
                <ul class="time_item" v-for="(item, index) in timeList()" :key="index">
                    {{item}}
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
            day: this.$route.params.day,
            condition: this.$route.params.condition
        }
    },
    methods: {
        timeList() {
            if (this.condition == 'unknown') {
                return this.logInfo.unknown[this.itemNum].timeList;
            } else {
                return this.logInfo.simple[this.itemNum].timeList;
            }
        }
    },
}
</script>

<style lang="scss">
    #time_item_tb {
        display: block;
        margin-top: 110px;
        margin-left: 15%;
        margin-right: 15%;
        background-color: rgb(255, 255, 255);
    }
    .time_item {
        text-align: center;
        background-color: rgb(255, 255, 255);
        margin-bottom: 10px;
        line-height: 40px;
        font-size: 18px;
        font-weight: bold;
        color: rgb(134, 134, 134);
        border-radius: 10px;
        box-shadow: 0 0 5px rgb(223, 223, 223);
    }
</style>