<template>
    <page-main>
        <div id="charts" ref="chartDOM" />
    </page-main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import echarts from 'echarts'
const chartDOM = ref(null)
onMounted(() => {
    const myCharts = echarts.init(chartDOM)

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
    myCharts.setOptions(option)
})
</script>

<style lang="scss" scoped>
//scss
</style>
