<template>
    <div>
        <div id="log_info">
            <TopBanner :custom_ico="ico" :custom_txt="'日志信息'"></TopBanner>
            <div id="log_chse_bar">
                <div id="err_log_chse" class="log_chse_item" @click="onLogClick('error')">
                    <img class="log_item_ico" src="../assets/error.svg" alt="error">
                    <b>ERROR日志</b>
                    <img class="to_ico" src="../assets/jiantou.svg" alt="to_ico">
                </div>
                <div id="warn_log_chse" class="log_chse_item" @click="onLogClick('warn')">
                    <img class="log_item_ico" src="../assets/warn.svg" alt="warn">
                    <b>WARN 日志</b>
                    <img class="to_ico" src="../assets/jiantou.svg" alt="to_ico">
                </div>
            </div>
        </div>
        <BottomBar :leftTo="'ChartInfo'"></BottomBar>
    </div>
</template>

<script>
import {getLogApi} from '../api/lh.js'
import TopBanner from './component/TopBanner.vue'
import BottomBar from './component/BottomBar.vue'

export default {
    components: {
        TopBanner,
        BottomBar
    },
    data() {
        return {
            ico: require('../assets/log.svg')
        }
    },
    methods: {
        onLogClick(lvl) {
            let titTxt = 'ERROR日志';
            if (lvl == 'warn') titTxt = 'WARN 日志';
            this.$router.push({
                name: "LogDetail",
                params: {
                    day: 'today',
                    tit: titTxt,
                    lvl: lvl
                }
            })
        }
    },
}
</script>

<style lang="scss">
    #log_chse_bar {
        margin: 380px 12% 0 12%;
        
    }
    .log_chse_item {
        position: relative;
        display: block;
        background-color: white;
        margin-bottom: 15px;
        line-height: 50px;
        border-radius: 30px;
        box-shadow: 0 0 10px rgba(221, 221, 221, 0.678);
        text-align: left;
        padding-left: 50px;
    }
    .log_item_ico {
        position: absolute;
        left: 15px;
        top: 14px;
        height: 20px;
    }
    .to_ico {
        position: absolute;
        top: 15px;
        height: 20px;
        right: 15px;
    }
    .log_chse_item b {
        
        color: rgb(155, 155, 155);
    }
</style>