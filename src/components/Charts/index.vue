<template>
    <div :id="options.id" />
</template>

<script setup name="Charts">
import { onMounted, watchEffect } from 'vue'
import { globalVariable } from '@/util/global.properties'
const props = defineProps({
    options: {
        type: Object,
        default: Object
    },
    type: {
        type: String,
        default: 'Line'
    }
})
onMounted(() => {
    initLineCharts()
})

watchEffect(async() => {
    try {
        const res = await import(`./hooks/use${props.type}.js`)
        onReload(await res.default(myCharts), { notMerge: true })
    } catch (error) {
        console.log(error)
    }
})
/**
 * 初始化折线图
 * 调用时机：DOM加载完成
 */
let myCharts = null
const initLineCharts = () => {
    myCharts = globalVariable.$echarts.init(document.getElementById(props.options.id), 'light')
    // if (props.options && JSON.stringify(props.options) !== '{}') {
    //     onReload(props.options.chartsOptions)
    // }
}
/**
 * 重新渲染
 * 调用时机：宽度高度发生变化时调用
 */
const onReload = (...config) => {
    myCharts.setOption(...config)
}

const onResize = config => {
    myCharts.resize(config)
}
onResize
</script>
