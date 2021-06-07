<template>
    <div>
        <div id="bottom_bar" v-show="hidshow">
            <div id="left_bt_bar" class="bt_bar">
                <div id="skip_btn_left" class="skip_btn" @click="skipPage(leftTo)">
                    <img :src="leftIco()" alt="left">
                </div>
            </div>
            <div id="right_bt_bar" class="bt_bar">
                <div id="skip_btn_right" class="skip_btn" @click="skipPage(rightTo)">
                    <img :src="rightIco()" alt="right">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let skipLogIco = require('../../assets/skip_log.svg');
let skipSearchIco = require('../../assets/skip_search.svg');
let skipChartIco = require('../../assets/skip_chart.svg');

export default {
    props: {
        leftTo: {
            type: String,
            default: 'Home'
        },
        rightTo: {
            type: String,
            default: 'Home'
        }
    },
    data() {
        return {
            docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
            showHeight: document.documentElement.clientHeight,   //实时屏幕高度
            hidshow:true  //显示或者隐藏footer        
        }
    },
    methods: {
        leftIco() {
            if (this.leftTo == 'LogInfo') return skipLogIco;
            else if (this.leftTo == 'ChartInfo') return skipChartIco;
            else return skipSearchIco;
        },
        rightIco() {
            if (this.rightTo == 'LogInfo') return skipLogIco;
            else if (this.rightTo == 'ChartInfo') return skipChartIco;
            else return skipSearchIco;
        },
        //页面跳转
        skipPage(page) {
            this.$router.push({
                name: page
            });
        },
    },
    mounted() {
        // window.onresize监听页面高度的变化
        window.onresize = ()=>{
            return(()=>{
                this.showHeight = document.documentElement.clientHeight;
            })()
        }
    },
    watch: {
        showHeight:function() {
            if(this.docmHeight > this.showHeight){
                this.hidshow=false;
            }else{
                this.hidshow=true;
            }
        }
    },
}
</script>

<style lang="scss">
    .skip_btn {
        display: inline-block;
        background-color: white;
        height: 50px;
        width: 50px;
        border-radius: 30px;
        border: 1px solid rgb(230, 230, 230);
        text-align: center;
    }
    .skip_btn img {
        width: 30px;
        margin-top: 9px;
    }
    #left_bt_bar {
        position: fixed;
        left: 0;
        bottom: 40px;
        width: 80px;
        height: auto;
        background-color: white;
        border-radius: 0 30px 30px 0;
        box-shadow: 0 0 10px rgba(206, 206, 206, 0.52);
        border: 1px solid rgb(235, 235, 235);
        padding: 3px 4px 3px 0;
        text-align: right;
    }
    #right_bt_bar {
        position: fixed;
        right: 0;
        bottom: 40px;
        width: 80px;
        height: auto;
        background-color: white;
        border-radius: 30px 0 0 30px;
        box-shadow: 0 0 10px rgba(206, 206, 206, 0.52);
        border: 1px solid rgb(235, 235, 235);
        padding: 3px 0 3px 4px;
        text-align: left;
    }
</style>