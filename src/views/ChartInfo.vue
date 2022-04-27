<template>
    <div>
        <div id="setting_window_frame">
            <div id="setting_window">
                <div id="setting_close_btn" @click="settingClose()">×</div>
                <div id="setting_title">修改爬虫超时时间</div>
                <div class="inputer">
                    建立连接超时时间
                    <input type="number" :value="socketTimeout" id="socket_timeout_inputer">
                    ms
                </div>
                <div class="inputer">
                    数据传输超时时间
                    <input type="number" :value="connectionTimeout" id="connection_timeout_inputer">
                    ms
                </div>
                <div id="timeout_submit_btn" @click="onTimeoutSubmit()">修改</div>
            </div>
            <cube-popup type="update-suc-popup" :mask="false" ref="update-suc-popup">
                <div id="setting_popup_msg">
                    {{popupMsg}}
                </div>
            </cube-popup>
        </div>
        <div id="chart_info">
            <div id="timeout_setting_btn" @click="onSetting()">
                <img :src="settingIco" alt="settings">
            </div>
            <div id="day_chse_btn">
                <b id="today_btn" @click="onDayChange('today')">今日</b>
                <b id="yesterday_btn" @click="onDayChange('yesterday')">昨日</b>
            </div>
            <TopBanner :custom_ico="ico" :custom_txt="'时段请求量'"></TopBanner>
            <div id="fail_to_load_txt" v-if="!haveData">加载失败</div>
            <div id="chart_main" style="margin:310px 5% 0 5%;height:360px;padding:6px 0 6px 0;"></div>
        </div>
        <BottomBar :leftTo="'Home'" :rightTo="'LogInfo'"></BottomBar>
    </div>
</template>

<script>
import TopBanner from './component/TopBanner.vue'
import BottomBar from './component/BottomBar.vue'
import * as echarts from 'echarts'
import {getTimeReportApi, getCrawlerTimeoutApi, setCrawlerTimeoutApi} from '../api/lh.js'

export default {
    components: {
        TopBanner,
        BottomBar
    },
    data() {
        return {
            settingIco: require('../assets/setting.svg'),
            ico: require('../assets/chart.svg'),
            haveData: false,
            day: 'today',
            socketTimeout: 0,
            connectionTimeout: 0,
            popupMsg: '修改成功'
        }
    },
    mounted() {
        this.changeChartDay(this.day);
        this.initTimeout();
    },
    methods: {
        //展示popup
        showPopup(refId) {
            const component = this.$refs[refId]
            component.show()
            setTimeout(() => {
                component.hide()
            }, 1000)
        },
        initTimeout() {
            let date = new Date();
            getCrawlerTimeoutApi(date.getHours()).then(
                res => {
                    if (res.data.code == 10000) {
                        this.socketTimeout = res.data.data.socketTimeout;
                        this.connectionTimeout = res.data.data.connectTimeout;
                    } else {
                        this.socketTimeout = 0;
                        this.connectionTimeout = 0;
                    }
                }
            )
        },
        onTimeoutSubmit() {
            let date = new Date();
            const params = new URLSearchParams();
            params.append('connectionTimeout', document.getElementById('connection_timeout_inputer').value);
            params.append('socketTimeout', document.getElementById('socket_timeout_inputer').value);
            params.append('userId',  date.getHours());
            setCrawlerTimeoutApi(params).then(
                res => {
                    if (res.data.code == 10000) {
                        this.popupMsg = '修改成功';
                        this.showPopup('update-suc-popup');
                    } else {
                        this.popupMsg = '修改失败';
                        this.showPopup('update-suc-popup');
                    }
                }
            )
        },
        settingClose() {
            let settingBar = document.getElementById('setting_window_frame');
            settingBar.classList.remove('up');
        },
        onSetting() {
            let settingBar = document.getElementById('setting_window_frame');
            settingBar.classList.add('up');
        },
        changeChartDay(day) {
            let date = new Date();
            getTimeReportApi(day, date.getHours()).then(
                res => {
                    if (res.data.code == 10000) {
                        this.haveData = true;
                        this.loadChart(res.data.data.requestCount, res.data.data.abnormalCount);
                    } else {
                        this.haveData = false
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
                this.changeChartDay('today');
                this.day = 'today';
            } else {
                let btn = document.getElementById('today_btn');
                btn.style.backgroundColor = 'rgb(20, 223, 172)';
                btn.style.color = 'white';
                btn = document.getElementById('yesterday_btn');
                btn.style.backgroundColor = 'white';
                btn.style.color = 'rgb(20, 223, 172)';
                this.changeChartDay('yesterday');
                this.day = 'yesterday';
            }
        },
        //加载图表
        loadChart(requestCount, abnormalCount) {
            var myChart = echarts.init(document.getElementById('chart_main'));
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: ['总请求量', '本地成功']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['0点', '1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点', '12点', '13点', '14点', '15点', '16点', '17点', '18点', '19点', '20点', '21点', '22点', '23点']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '本地成功',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: abnormalCount
                    },
                    {
                        name: '总请求量',
                        type: 'line',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'top'
                        },
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data: requestCount
                    }
                ]
            };
            myChart.setOption(option);
        }
    },
}
</script>

<style lang="scss">
    #chart_main {
        background-color: white;
        box-shadow: 0 0 10px rgb(206, 206, 206);
        border-radius: 5px;
    }
    #fail_to_load_txt {
        z-index: 10;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: rgb(161, 161, 161);
    }
    #timeout_setting_btn img {
        height: 23px;
    }
    #timeout_setting_btn {
        position: absolute;
        top: 47px;
        left: 25px;
    }
    #setting_window_frame {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(77, 77, 77, 0.377);
        z-index: -1;
        visibility: hidden;
    }
    #setting_window_frame.up {
        z-index: 12;
        visibility: visible;
    }
    #setting_window {
        position: absolute;
        background: white;
        left: 50%;
        top: 50%;
        width: 80%;
        transform: translate(-50%, -50%);
        height: 240px;
        padding: 10px;
        border-radius: 5px;
        color: rgb(51, 56, 56);
    }
    #setting_close_btn {
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 25px;
        color: rgb(93, 98, 102);
    }
    #setting_title {
        margin-top: 15px;
        font-size: 18px;
        margin-bottom: 50px;
        letter-spacing: 2px;
    }
    #socket_timeout_inputer, #connection_timeout_inputer {
        display: inline-block;
        width: 70px;
        outline: none;
        font-size: 14px;
        background: rgba(225, 236, 236, 0.637);
        margin-left: 6px;
        padding: 3px;
        color: rgb(58, 135, 139);
    }
    #setting_window div.inputer {
        margin-bottom: 20px;
        margin-top: 20px;
        font-size: 16px;
        letter-spacing: 1px;
    }
    #timeout_submit_btn {
        margin-top: 45px;
        font-size: 18px;
        letter-spacing: 5px;
        color: rgb(113, 187, 162);
    }
    #setting_popup_msg {
        background-color: rgba(56, 56, 56, 0.431);
        border-radius: 20px;
        padding: 10px 30px 10px 30px;
        color:rgba(255, 255, 255, 0.966);
    }
</style>