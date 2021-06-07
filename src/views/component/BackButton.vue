<template>
    <div>
        <div id="back_button">
            <button id="back_btn" @click="toParam == null ? onBack():onBackWithParam()" :style="shadowToShow">
            <img id="back_ico" src="../../assets/back.svg" alt="back">
            <b id="back_text">返回</b>
        </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        toPage: {
            type: String,
            default: 'Home'
        },
        toParam: {
            type: Object,
            default: null
        },
        shadowOn: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            shadowToShow: this.shadowOn ? 'box-shadow: 0 0 5px rgba(177, 177, 177, 0.815);':'box-shadow: none;'
        }
    },
    
    methods: {
        //返回事件
        onBackWithParam() {
            this.$router.push({
                name: this.toPage,
                params: this.toParam
            })
        },
        onBack() {
            this.$router.push({
                name: this.toPage
            })
        }
    },
}
</script>

<style lang="scss">
    #back_btn {
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
</style>