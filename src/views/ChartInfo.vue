<template>
    <div>
        <div id="chart_info">
            <TopBanner :custom_ico="ico" :custom_txt="'开发中'"></TopBanner>
        </div>
        <BottomBar :leftTo="'Home'" :rightTo="'LogInfo'"></BottomBar>
    </div>
</template>

<script>
import TopBanner from './component/TopBanner.vue'
import BottomBar from './component/BottomBar.vue'

export default {
    components: {
        TopBanner,
        BottomBar
    },
    data() {
        return {
            ico: require('../assets/chart.svg')
        }
    }
}
</script>