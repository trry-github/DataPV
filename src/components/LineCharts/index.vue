<template>
    <div :id="options.id" v-observe-element-height="onReload" style="width: 100%;height: 100%;" />
</template>

<script setup name="LineCharts">
import { onMounted } from 'vue'
import { globalVariable } from '@/util/global.properties'
const props = defineProps({
    options: {
        type: Object,
        default: Object
    }
})
let myCharts = null
onMounted(() => {
    initLineCharts()
})
/**
 * 初始化折线图
 * 调用时机：DOM加载完成
 */
const initLineCharts = () => {
    myCharts = globalVariable.$echarts.init(
        document.getElementById(props.options.id), 'light'
    )
    if (props.options && JSON.stringify(props.options) !== '{}') {
        onReload()
    }
}

/**
 * 重新渲染
 * 调用时机：宽度高度发生变化时调用
 */
const onReload = config => {
    myCharts.setOption(config || props.options.chartsOptions)
}
</script>
