<template>
    <div>
        <div id="head_bar">
            <BackButton :shadowOn="false" :toPage="toPage" :toParam="toParam"></BackButton>
            <div id="title_txt">{{title}}</div>
        </div>
    </div>
</template>

<script>
import BackButton from './BackButton.vue';

export default {
    components: {
        BackButton
    },
    props: {
        toPage: {
            type: String,
            default: 'Home'
        },
        toParam: {
            type: Object,
            default: null
        },
        title: {
            type: String,
            defaut: "Title"
        }
    }
}
</script>

<style lang="scss">
    #head_bar {
        z-index: 10;
        position: fixed;
        top: 0;
        width: 100%;
        height: 90px;
        background-color: rgb(20, 223, 172);
        text-align: center;
        box-shadow: 0 0 10px rgba(168, 168, 168, 0.815);
    }
    #title_txt {
        margin-top: 52px;
        font-size: 18px;
        color: #ffffff;
    }
</style>