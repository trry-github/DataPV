<template>
    <div id="line-charts" v-observe-element-height="onResize" />
</template>

<script setup name="LineCharts">
import { onMounted, defineProps } from 'vue'
import { globalVariable } from '@/util/global.properties'
const props = defineProps({
    options: {
        type: Object,
        default: Object
    }
})
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

    myCharts.setOption(props.options.chartsOptions)
}

/**
 * 重新渲染
 * 调用时机：宽度高度发生变化时调用
 */
const onResize = () => {
    console.log(123)

}
</script>

<style lang="scss" scoped>
// scss
#line-charts {
    width: v-bind("options.style.width");
    height: v-bind("options.style.height");
    position: absolute;
    top: v-bind("options.style.top");
    left: v-bind("options.style.left");
    right: v-bind("options.style.right");
    bottom: v-bind("options.style.bottom");
}
</style>
