<template>
    <div>
        <div id="log_detail_page">
            <div id="day_chse_btn">
                <b id="today_btn" @click="onDayChange('today')">今日</b>
                <b id="yesterday_btn" @click="onDayChange('yesterday')">昨日</b>
            </div>
            <HeadBar :toPage="'LogInfo'" :title="titleTxt"></HeadBar>
            <table class="unknown_log_tb">
                <ul class="unknown_log_item" v-for="(item1, indes) in unknownLog" :key="indes">
                    <div class="unknown_txt">未知异常：{{item1.logText}}</div>
                    <div class="simple_line"></div>
                    <div><b>类路径：</b>{{item1.packagePath}}</div>
                    <div><b>触发次数：</b>{{item1.occurredTimes}}</div>
                    <div>
                        <b>最后触发时间：</b>
                        {{item1.timeList[0]}} <div class="time_detail" v-if="item1.timeList.length > 1" @click="onTimeBtn(indes, 'unknown')">详细时间</div>
                    </div>
                    <div class="unknown_log_stack_btn" @click="onStackBtn(indes)">查看堆栈</div>
                </ul>
            </table>
            <table class="simple_log_tb">
                <ul class="simple_log_item" v-for="(item, index) in simpleLog" :key="index">
                    <div class="log_txt">{{item.logText}}</div>
                    <div class="simple_line"></div>
                    <div><b>类路径：</b>{{item.packagePath}}</div>
                    <div><b>触发次数：</b>{{item.occurredTimes}}</div>
                    <div>
                        <b>最后触发时间：</b>
                        {{item.timeList[0]}} <div class="time_detail" v-if="item.timeList.length > 1" @click="onTimeBtn(index, 'simple')">详细时间</div>
                    </div>
                </ul>
            </table>
            <div id="empty_log_msg" v-if="simpleLog == null && unknownLog == null">无日志信息</div>
        </div>
    </div>
</template>

<script>
import HeadBar from './component/HeadBar.vue'
import {getLogApi} from '../api/lh.js'

export default {
    components: {
        HeadBar
    },
    data() {
        return {
            logInfo: {
                simple: null,
                unknown: null
            },
            simpleLog: null,
            unknownLog: null,
            titleTxt: this.$route.params.tit,
            lvl: this.$route.params.lvl,
            day: this.$route.params.day
        }
    },
    mounted: function() {
        this.onDayChange(this.day);
    },
    methods: {
        onTimeBtn(itemNum, condition) {
            this.$router.push({
                name: "LogTimeDetail",
                params: {
                    tit: this.titleTxt,
                    logInfo: this.logInfo,
                    itemNum: itemNum,
                    lvl: this.lvl,
                    day: this.day,
                    condition: condition
                }
            })
        },
        onStackBtn(itemNum) {
            this.$router.push({
                name: "LogStackDetail",
                params: {
                    tit: this.titleTxt,
                    logInfo: this.logInfo,
                    itemNum: itemNum,
                    lvl: this.lvl,
                    day: this.day
                }
            })
        },
        changeLogDay(day) {
            let date = new Date();
            getLogApi(this.lvl, day, date.getHours()).then(
                res => {
                    if (res.data.code == 10000) {
                        this.logInfo = res.data.data
                        this.simpleLog = res.data.data.simple
                        this.unknownLog = res.data.data.unknown
                    } else {
                        this.logInfo = {
                                    simple: null,
                                    unknown: null
                        }
                        this.simpleLog = null
                        this.unknownLog = null
                    }
                }
            )
        },
        onDayChange(day) {
            if (day == 'today') {
                let btn = document.getElementById('yesterday_btn');
                btn.style.backgroundColor = 'rgb(20, 223, 172)';
                btn.style.color = 'white';
                btn = document.getElementById('today_btn');
                btn.style.backgroundColor = 'white';
                btn.style.color = 'rgb(20, 223, 172)';
                this.changeLogDay('today');
                this.day = 'today';
            } else {
                let btn = document.getElementById('today_btn');
                btn.style.backgroundColor = 'rgb(20, 223, 172)';
                btn.style.color = 'white';
                btn = document.getElementById('yesterday_btn');
                btn.style.backgroundColor = 'white';
                btn.style.color = 'rgb(20, 223, 172)';
                this.changeLogDay('yesterday');
                this.day = 'yesterday';
            }
        }
    },
}
</script>

<style lang="scss">
    #day_chse_btn {
        position: fixed;
        z-index: 11;
        top: 45px;
        right: 27px;
        border: 1px solid white;
        border-radius: 15px;
        padding: 2px;
    }
    #today_btn {
        background-color: white;
        color: rgb(20, 223, 172);
    }
    #yesterday_btn {
       background-color: rgb(20, 223, 172);
       color: white;
    }
    #today_btn, #yesterday_btn {
        display: inline-block;
        padding: 5px 7px 5px 7px;
        line-height: 14px;
        font-size: 14px;
        border-radius: 12px;
    }
    .unknown_log_stack_btn {
        margin-top: 18px;
        background-color: rgb(255, 255, 255);
        border-top: 2px solid rgb(238, 238, 238);
        padding-top: 10px;
        text-align: center;
        color: rgb(22,195,152);
    }
    .time_detail {
        display: inline-block;
        color: rgb(22,195,152);
        background-color: rgb(219, 255, 236);
        padding: 3px 5px 3px 5px;
        font-size: 13px;
        margin-left: 10px;
        border-radius: 10px;
    }
    .unknown_txt {
        color: rgb(194, 75, 75);
        font-weight: bold;
    }
    #empty_log_msg {
        color: rgb(184, 184, 184);
    }
    .simple_line {
        display: block;
        border-top: 2px dashed rgb(230, 230, 230);
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .unknown_log_tb {
        margin-top: 120px;
    }
    .simple_log_tb, .unknown_log_tb {
        display: block;
        margin-left: 4%;
        margin-right: 4%;
    }
    .simple_log_item, .unknown_log_item {
        background-color: rgb(255, 255, 255);
        margin-bottom: 15px;
        text-align: left;
        word-wrap: break-word;
        padding: 16px 10px 16px 10px;
        border-radius: 10px;
        box-shadow: 0 0 5px rgba(214, 214, 214, 0.822);
        color: rgb(158, 158, 158);
        line-height: 23px;
    }
    .simple_log_item div b, .unknown_log_item div b {
        color: rgb(71, 71, 71);
    }
    .log_txt {
        color: rgb(85, 85, 85);
        font-weight: bold;
    }
</style>