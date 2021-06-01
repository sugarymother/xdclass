<template>
  <div id="login">
    <cube-popup type="search-fail-popup" :mask="false" ref="search-fail-pop">
      <div id="popup_msg">
        未搜索到对应用户
      </div>
    </cube-popup>

    <div id="header">
      <img id="lh_ico" src="../assets/lh.png" alt="icon_wh">
    </div>
    <div id="choose_bar">
        <button id="for_name_btn" @click="choseSearchMode(1)">按姓名</button>
        <button id="for_stunum_btn" @click="choseSearchMode(2)">按学号</button>
    </div>
    <div id="box">
      <div id="search_bar">
        <input id="inp_bar" v-model="keyword"  type="text">
        <cube-button id="search_btn" @click="onSearch(choseMode, keyword)" icon="cubeic-search">搜索</cube-button>
      </div>  
    </div>
    <div id="msg_text" v-if="stuNumList.length > 0">
      请选择:
    </div>
    <table id="stunum-list-tb">
      <ul class="stunum-list-bar" @click="onStuNumClick(stuNum)" v-for="(stuNum, index) in stuNumList" :key="index">{{stuNum}}</ul>
    </table>
  </div>
</template>

<script>
import {getStuNumListApi, getUserDetailApi} from '../api/lh.js';

export default {
  data() {
    return {
      keyword: "",
      choseMode: 2,
      stuNumList: new Array()
    };
  },
  methods: {
    //切换搜索模式
    choseSearchMode(mode) {
      let btnForName = document.getElementById("for_name_btn");
      let btnForStuNum = document.getElementById("for_stunum_btn");
      if (mode == 1) {
        btnForStuNum.style.backgroundColor = "rgb(22, 195, 152)";
        btnForStuNum.style.color = "white";
        btnForName.style.backgroundColor = "white";
        btnForName.style.color = "rgb(22, 195, 152)";
      } else {
        btnForName.style.backgroundColor = "rgb(22, 195, 152)";
        btnForName.style.color = "white";
        btnForStuNum.style.backgroundColor = "white";
        btnForStuNum.style.color = "rgb(22, 195, 152)";
      }
      this.choseMode = mode;
    },

    //展示popup
    showPopup(refId) {
      const component = this.$refs[refId]
      component.show()
      setTimeout(() => {
        component.hide()
      }, 1000)
    },

    //页面跳转
    skipPage(detail) {
      this.$router.push({
        name: "StuInfo",
        params: {
          stuDetail: detail
        }
      });
    },

    //搜索事件
    onSearch(mode, key) {
      if (key.length == 0) return;

      let date = new Date();
      if (mode == 1) {
        getStuNumListApi(key, date.getHours()).then(
          res => {
            if(res.data.code == 10000) {
              let stuNumArr = res.data.data;
              if (stuNumArr.length == 0) {
                this.stuNumList = new Array();
                this.showPopup('search-fail-pop');  
              } else {
                this.stuNumList = res.data.data;
              }
            } else {
              this.stuNumList = new Array();
              this.showPopup('search-fail-pop');
            }
          }
        )
      } else {
        getUserDetailApi(key, date.getHours()).then(
          res => {
            if(res.data.code == 10000) {
              this.skipPage(res.data.data);
            } else {
              this.showPopup('search-fail-pop');
            }
          }
        );
      }
    },

    //学号栏点击事件
    onStuNumClick(key) {
      this.onSearch(2, key);
    }
  }
};
</script>

<style lang="scss">
#login {
  position: fixed;
  background-color: rgb(255, 255, 255);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
#inp_bar {
  float: left;
  width: 62%;
  height: 47px;
  margin: 0;
  border-radius: 30px;
  border: 2px solid rgb(22, 195, 152);
  outline:none; 
  text-align: left;
  padding-left: 20px;
  color: rgb(105, 105, 105);
  font-size: 16px;
}
#search_bar {
  border-radius: 25px;
  box-shadow: 0 0 12px rgba(52, 136, 80, 0.404);
}
#box {
  margin-top: 20px;
  margin-left: 10%;
  margin-right: 10%;
  text-align: center;
  background-color: rgb(22, 195, 152);
  border-radius: 30px;
}
#search_btn {
  border-radius: 0 30px 30px 0;
  display: inline-block;
  width: auto;
  height: 51px;
  background-color: rgb(22, 195, 152);
}
#header {
  text-align: center;
  background-color: rgb(20, 223, 172);

  border-radius: 0 0 12% 12%;
}
#lh_ico {
  display: inline-block;
  width: 25%;
  margin-top: 20%;
  margin-bottom: 70px;
}

#choose_bar {
  margin: 20% 60% 0 12%;
  border: 2px solid rgb(22, 195, 152);
  background-color: rgb(22, 195, 152);
  border-radius: 12px;
}

#for_stunum_btn {
  border: none;
  outline: none;
  width: 50%;
  height: 25px;
  background-color: white;
  border-radius: 10px;
  color: rgb(22, 195, 152);
  font-size: 10px;
}
#for_name_btn {
  border: none;
  outline: none;
  width: 50%;
  height: 25px;
  background-color: rgb(22, 195, 152);
  border-radius: 10px;
  color: white;
  font-size: 10px;
}
#popup_msg {
  background-color: rgba(56, 56, 56, 0.431);
  border-radius: 20px;
  padding: 10px 30px 10px 30px;
  color:rgba(255, 255, 255, 0.966);
}
#msg_text {
  margin-top: 15%;
  font-size: 16px;
  color: rgb(109, 109, 109);
}
#stunum-list-tb {
  display: block;
  margin: 15px 20% 0 20%;
  text-align: center;
}
.stunum-list-bar {
  display: block;
  width: 100%;
  padding-top: 12px;
  padding-bottom: 12px;
  color: rgb(133, 133, 133);
  font-size: 18px;
  border-radius: 10px;
  box-shadow: 0 0 10px #d3d3d3;
  margin-bottom: 10px;
}
</style>