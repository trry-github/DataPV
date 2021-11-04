<template>
    <div :id="'line-charts'+modelValue.id" v-observe-element-height="onReload" style="width: 100%;height: 100%;" />
</template>

<script setup name="LineCharts">
import { computed, onMounted } from 'vue'
import { globalVariable } from '@/util/global.properties'
const props = defineProps({
    modelValue: {
        type: Object,
        default: Object
    }
})
const emit = defineEmits(['update:modelValue'])
const myCharts = {}
const options = computed({
    get() {
        return props.modelValue
    },
    set(val) {
        emit('update:modelValue', val)
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
    myCharts.value = globalVariable.$echarts.init(
        document.getElementById('line-charts' + props.modelValue.id), 'light'
    )
    if (options.value && JSON.stringify(options.value) !== '{}') {
        onReload()
    }
}

/**
 * 重新渲染
 * 调用时机：宽度高度发生变化时调用
 */
const onReload = config => {
    myCharts.value.setOption(config || options.value.chartsOptions)
}
</script>
