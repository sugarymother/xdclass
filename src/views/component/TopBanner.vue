<template>
    <div>
        <div id="top_banner">
            <img id="lh_ico" :src="custom_ico" alt="icon_wh">
            <div>{{custom_txt}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        custom_ico: {
            type: String,
            default: require('../../assets/lh.png')
        },
        custom_txt: {
            type: String,
            default: 'DEBUG'
        }
    }
}
</script>

<style lang="scss">
    #top_banner {
        z-index: -10;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        text-align: center;
        background-color: rgb(20, 223, 172);

        border-radius: 0 0 12% 12%;
    }
    #lh_ico {
        display: inline-block;
        width: 100px;
        height: 100px;
        margin-top: 28%;
        margin-bottom: 30px;
    }
    #top_banner div {
        font-size: 17px;
        color: white;
        font-weight: bold;
        margin-bottom: 30px;
    }
</style>