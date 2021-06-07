<template>
    <div id="record">
        <HeadBar :toPage="'StuInfo'" :toParam="{'stuDetail': stuDetail}" :title="'操作记录'"></HeadBar>
        <table id="rcd_tb">
            <ul v-for="(record, index) in records" :key="index" class="rcd_item">
                <div class="rcd_date_txt">{{record.date}}</div>
                <table class="sig_rcd_tb">
                    <ul class="sig_rcd_item" v-for="(item, index) in record.records" :key="index">
                        <div class="sig_rcd_txt">
                            <div>操作平台：{{item.platform}}</div>
                            <div>操作名称：{{item.operationName}}</div>
                            <div>操作次数：{{item.operationNum}} 次</div>
                            <div>最后操作IP：{{item.lastIp}}</div>
                            <div>最后操作时间：{{item.lastTime}}</div>
                            <div>
                                最后操作状态：
                                <b class="suc_txt" v-if="item.lastStatus == '成功'">{{item.lastStatus}}</b>
                                <b class="local_suc_txt" v-else-if="item.lastStatus == '官网异常，本地成功'">{{item.lastStatus}}</b>
                                <b class="failed_txt" v-else>{{item.lastStatus}}</b>
                            </div>
                        </div>
                        <div class="line" v-if="index != record.records.length - 1"> </div>
                    </ul>
                </table>
            </ul>
        </table>
        <div v-if="records.length == 0" id="empty_msg">七天内没有进行任何操作</div>
    </div>
</template>

<script>
import HeadBar from './component/HeadBar.vue';

export default {
    components: {
        HeadBar
    },
    data() {
        return {
            stuDetail: this.$route.params.stuDetail,
            records: this.$route.params.records,
        }
    },
    methods: {
        onBack(detail) {
            this.$router.push({
                name: "StuInfo",
                params: {
                    stuDetail: detail
                }
            });
        }
    }
}
</script>

<style lang="scss">
#back_btn_t {
    display: block;
    position: absolute;
    left: 7%;
    top: 45px;
    padding: 5px 8px 5px 8px;
    background-color: white;
    outline: none;
    border: none;
    font-size: 14px;
    line-height: 20px;
    border-radius: 15px;
    //box-shadow: 0 0 5px rgba(177, 177, 177, 0.815);
}
#rcd_tb {
    margin: 110px 5% 0 5%;
    width: 90%;
}
.rcd_item {
    text-align: center;
}
.rcd_date_txt {
    color:rgb(200, 200, 200);
    margin-bottom: 10px;
}
.line {
    display: block;
    width: 100%;
    border-top: 2px solid rgb(235, 235, 235);
    margin: 10px 0 10px 0;
}
.sig_rcd_tb {
    display: block;
    width: 100%;
    margin-bottom: 30px;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(216, 216, 216, 0.815);
    padding: 15px 10px 15px 10px;
}
.sig_rcd_txt {
    text-align: left;
    padding: 10px 15px 10px 15px;
    line-height: 25px;
    color: rgb(102, 102, 102);
}
.suc_txt {
    color: rgb(4, 170, 4);
}
.failed_txt {
    color: rgb(211, 68, 2);
}
#empty_msg {
    margin-top: 30px;
    font-size: 16px;
    color: rgb(197, 197, 197);
}
</style>