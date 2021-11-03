<template>
    <div id="line-charts" v-observe-element-height="onReload" />
</template>

<script setup name="LineCharts">
import { onMounted, ref } from 'vue'
import { globalVariable } from '@/util/global.properties'
const props = defineProps({
    options: {
        type: Object,
        default: Object
    }
})
const myCharts = ref({})
onMounted(() => {
    initLineCharts()
})
/**
 * 初始化折线图
 * 调用时机：DOM加载完成
 */
// 'light'
const initLineCharts = () => {
    myCharts.value = globalVariable.$echarts.init(
        document.getElementById('line-charts')
    )
    if (props.options && JSON.stringify(props.options) !== '{}') {
        onReload()
    }
}

// watchEffect(() => {
//     onReload()
// })

/**
 * 重新渲染
 * 调用时机：宽度高度发生变化时调用
 */
const onReload = options => {
    console.log(options || props.options.chartsOptions)
    myCharts.value.setOption(options || props.options.chartsOptions)
}
</script>

<style lang="scss" scoped>
// scss
#line-charts {
    width: 100%;
    height: 100%;
}
</style>
