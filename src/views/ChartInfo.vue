<template>
    <div>
        <div id="chart_info">
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
import {getTimeReportApi} from '../api/lh.js'

export default {
    components: {
        TopBanner,
        BottomBar
    },
    data() {
        return {
            ico: require('../assets/chart.svg'),
            haveData: false,
            day: 'today'
        }
    },
    mounted() {
        this.changeChartDay(this.day);
    },
    methods: {
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
</style>