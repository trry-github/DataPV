<template>
    <div class="components-wrap">
        <div class="tool-tip">
            <span class="title">{{ options.title }}</span>
            <p>
                <el-tooltip v-for="item in dataMap.iconList" :key="item.type" effect="light" :content="item.name" placement="top">
                    <svg-icon class="icon" :class="{'active':dataMap.componentType === item.type}" :name="item.type" @click="onSelectChart(item)" />
                </el-tooltip>
            </p>
        </div>
        <charts ref="chartEle" class="component" :options="options" :type="dataMap.componentType" />
    </div>
</template>

<script setup name="RenderBox">
import { onMounted, reactive, ref } from 'vue'
// import { useChartResize } from '@/globalHooks/chartResize'

const props = defineProps({
    options: {
        type: Object,
        required: true
    }
})
const chartEle = ref(null)
const dataMap = reactive({
    componentType: props.options.defaultType,
    iconList: [
        {
            type: 'Area',
            name: '地图'
        },
        {
            type: 'Funnel',
            name: '漏斗图'
        },
        {
            type: 'Pie',
            name: '饼图'
        },
        {
            type: 'Line',
            name: '折线图'
        },
        {
            type: 'Bar',
            name: '柱状图'
        },
        {
            type: 'Table',
            name: '表格'
        }
    ]
})

onMounted(() => {
    // useChartResize(chartEle.value.$el, chartEle.value.onResize)
})
// 组件
const onSelectChart = ({ type }) => {
    dataMap.componentType = type
}
</script>

<style lang="scss" scoped>
.components-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    .tool-tip {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
            font-size: 18px;
            font-weight: 400;
            padding: 0 5px;
        }
        .active {
            background-color: #ddd;
            cursor: pointer;
            border-radius: 3px;
        }
        .icon {
            width: 30px;
            height: 30px;
            padding: 5px;
            &:hover {
                @extend.active; }
        }
    }
    .component {
        flex: 1;
    }
}
</style>
