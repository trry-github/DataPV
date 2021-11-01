<template>
    <div>
        <page-main>
            <div id="line-charts" />
        </page-main>
    </div>
</template>

<script setup>
import { globalVariable } from '@/util/global.properties'
import { onMounted } from 'vue'

onMounted(() => {
    initLineCharts()
})
/**
 * 初始化折线图
 * 调用时机：DOM加载完成
 */
const initLineCharts = () => {
    const myCharts = globalVariable.$echarts.init(
        document.getElementById('line-charts')
    )
    const option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }
        ]
    }
    myCharts.setOption(option)

    console.log(myCharts)
}
</script>
<style lang="scss" scoped>
#line-charts {
    width: 800px;
    height: 400px;
}
</style>
