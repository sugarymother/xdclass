<template>
    <div id="info">
        <cube-popup type="copy-suc-popup" :mask="false" ref="copy-pop">
            <div id="popup_msg">
                复制成功
            </div>
        </cube-popup>

        <div id="header_bk"> </div>
        <button id="back_btn" @click="onBack()">
            <img id="back_ico" src="../assets/back.svg" alt="back">
            <b id="back_text">返回</b>
        </button>
        <div id="stu_info_list">
            <div id="stu_info_bar">
                学号： {{stuDetail.stuNum}} <br>
                <b v-if="stuDetail.stuName.length > 0">姓名： {{stuDetail.stuName}}<br></b> 
                <b v-if="stuDetail.sex.length > 0">性别： {{stuDetail.sex}}<br></b> 
                <b v-if="stuDetail.birthday.length > 0">生日： {{stuDetail.birthday}}<br></b> 
                <b v-if="stuDetail.nation.length > 0">民族： {{stuDetail.nation}}<br></b> 
                <b v-if="stuDetail.nickName.length > 0">昵称： {{stuDetail.nickName}}<br></b> 
                <b v-if="stuDetail.phone.length > 0">电话： {{stuDetail.phone}}<br></b> 
                <b v-if="stuDetail.email.length > 0">邮箱： {{stuDetail.email}}<br></b> 
                <b v-if="stuDetail.qqNum.length > 0">QQ号： {{stuDetail.qqNum}}<br></b> 
                <b v-if="stuDetail.wechatNum.length > 0">微信： {{stuDetail.wechatNum}}<br></b> 
                <b v-if="stuDetail.createTime.length > 0">首次登录： {{stuDetail.createTime}}<br></b> 
                <div class="pwd_box" v-if="stuDetail.jwcPwd.length > 0">
                    <b>教务密码：</b>
                    <b class="copy_box" @click="onCopy(stuDetail.jwcPwd)">
                        <b class="pwd_text">{{stuDetail.jwcPwd}}</b>
                        <img class="copy_ico" src="../assets/copy.svg" alt="copy">
                    </b>
                </div>
                <div class="pwd_box" v-if="stuDetail.libPwd.length > 0">
                    <b>图书馆密码：</b>
                    <b class="copy_box" @click="onCopy(stuDetail.libPwd)">
                        <b class="pwd_text">{{stuDetail.libPwd}}</b>
                        <img class="copy_ico" src="../assets/copy.svg" alt="copy">
                    </b>
                </div>
                <div class="pwd_box" v-if="stuDetail.wlsyPwd.length > 0">
                    <b>物理实验密码：</b>
                    <b class="copy_box" @click="onCopy(stuDetail.wlsyPwd)">
                        <b class="pwd_text">{{stuDetail.wlsyPwd}}</b>
                        <img class="copy_ico" src="../assets/copy.svg" alt="copy">
                    </b>
                </div>

                <button id="chk_rcd_btn" @click="onCheckRcd(stuDetail)">查看操作记录</button>
            </div>
        </div>
        <input id="tmp" type="text">
    </div>
</template>

<script>
import {getRecordApi} from '../api/lh.js'

export default {
    data() {
        return {
            stuDetail: this.$route.params.stuDetail
        }
    },
    methods: {
        //返回事件
        onBack() {
            this.$router.push({
                name: "Home"
            })
        },

        //展示popup
        showPopup(refId) {
            const component = this.$refs[refId]
            component.show()
            setTimeout(() => {
                component.hide()
            }, 1000)
        },

        //复制事件
        onCopy(text) {
            var tmp = document.getElementById("tmp");
            tmp.value=text;
            tmp.select();
            console.log(tmp.value);
            document.execCommand("Copy");
            window.getSelection().removeAllRanges();
            this.showPopup("copy-pop");
        },

        //查看操作记录事件
        onCheckRcd(detail) {
            let date = new Date();
            getRecordApi(detail.stuNum, date.getHours()).then(
                res => {
                    if (res.data.code == 10000) {
                        this.$router.push({
                            name: "Record",
                            params: {
                                stuDetail: detail,
                                records: res.data.data
                            }
                        });           
                    } else {
                        conosle.log("发生错误，拿取操作记录失败");
                    }
                }
            )
        }
    }
}
</script>

<style lang="scss">
#stu_info_list {
    display: block;
    margin: 0 7% 0 7%;
}
#stu_info_bar {
    background-color: white;
    display: block;
    padding: 30px 25px 10px 25px;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(216, 216, 216, 0.815);
    text-align: left;
    line-height: 28px;
    font-size: 18px;
    color: rgb(87, 87, 87);
}
#info {
    position: relative;
    padding-top: 80px;
}
#back_btn {
    display: block;
    position: absolute;
    left: 7%;
    top: 25px;
    padding: 5px 8px 5px 8px;
    background-color: white;
    outline: none;
    border: none;
    font-size: 14px;
    line-height: 20px;
    border-radius: 15px;
    box-shadow: 0 0 5px rgba(177, 177, 177, 0.815);
}
#back_ico {
    position: absolute;
    top: 7px;
    width: 15px;
}
#back_text {
    margin-left: 15px;
    color: rgb(124, 124, 124);
}
.copy_ico {
    margin-left: 6px;
    height: 14px;
}
.copy_box {
    background-color: rgb(245, 250, 231);
    color: rgb(22, 195, 152);
    padding: 4px 6px 4px 6px;
    border-radius: 10px;
}
.pwd_box {
    line-height: 35px;
}
#tmp {
    position: absolute;
    bottom: 0;
    position: absolute; 
    left: -99999px;
    //display: none;
}
#popup_msg {
  background-color: rgba(56, 56, 56, 0.431);
  border-radius: 20px;
  padding: 10px 30px 10px 30px;
  color:rgba(255, 255, 255, 0.966);
}
#chk_rcd_btn {
    display: block;
    margin-top: 15px;
    width: 100%;
    height: 40px;
    background-color: white;
    border-left: none;
    border-right: none;
    border-bottom: none;
    border-top: 2px solid rgb(235, 235, 235);
    outline: none;
    padding-top: 10px;
    font-size: 16px;
    color: rgb(22, 195, 152);
}
#header_bk {
    top: 0;
    position: absolute;
    z-index: -1;
    display: block;
    height: 240px;
    width: 100%;
    background-color: rgb(20, 223, 172);

    border-radius: 0 0 12% 12%;
}
</style>