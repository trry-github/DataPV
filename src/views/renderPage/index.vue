<template>
    <page-main>
        <search-bar>
            <el-form ref="form" :model="options" label-suffix=":" inline label-width="120">
                <el-form-item label="页面height">
                    <el-input v-model="options.height" />
                </el-form-item>
                <el-form-item label="页面width">
                    <el-input v-model="options.width" />
                </el-form-item>
                <el-form-item label="组件height">
                    <el-input v-model="options.children[0].style.height" />
                </el-form-item>
                <el-form-item label="组件width">
                    <el-input v-model="options.children[0].style.width" />
                </el-form-item>
                <el-form-item label="组件top">
                    <el-input v-model="options.children[0].style.top" />
                </el-form-item>
                <el-form-item label="组件left">
                    <el-input v-model="options.children[0].style.left" />
                </el-form-item>
                <el-form-item label="修改height">
                    <el-input v-model="options.height" />
                </el-form-item>
                <el-form-item label="修改width">
                    <el-input v-model="options.width" />
                </el-form-item>
                <el-form-item label="页面height">
                    <el-button @click="addChart('pie')">添加饼图</el-button>
                    <el-button @click="addChart('line')">添加折线图</el-button>
                </el-form-item>
            </el-form>
        </search-bar>
        <DrowPage v-model="options" />
    </page-main>
</template>

<script setup>
import { reactive } from 'vue'
import DrowPage from './components/DrowPage.vue'
import { globalVariable } from '@/util/global.properties'
const { $nanoid } = globalVariable
const options = reactive({
    id: $nanoid(),
    name: '页面名称',
    title: '页面标题',
    description: '描述',
    width: '100%', // 页面宽度
    height: '100vh', // 页面高度
    children: [
        {
            id: $nanoid(),
            name: 'LineCharts',
            style: { // 页面组件样式信息
                top: '200px',
                left: 700,
                width: 500, // 页面宽度
                height: 300 // 页面高度
            },
            chartsOptions: { // echarts 配置信息
                title: {
                    text: '折线图堆叠'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '邮件营销',
                        type: 'line',
                        stack: '总量',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '联盟广告',
                        type: 'line',
                        stack: '总量',
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '视频广告',
                        type: 'line',
                        stack: '总量',
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '直接访问',
                        type: 'line',
                        stack: '总量',
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '搜索引擎',
                        type: 'line',
                        stack: '总量',
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            }
        },
        {
            id: $nanoid(),
            name: 'LineCharts',
            style: { // 页面组件样式信息
                top: 100,
                left: 100,
                width: 500, // 页面宽度
                height: 300 // 页面高度
            },
            chartsOptions: {
                title: {
                    text: 'Referer of a Website',
                    subtext: 'Fake Data',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        }
    ]
})

const addChart = type => {
    let config = {
        name: 'LineCharts',
        id: $nanoid(),
        style: {
            top: 100,
            left: 100,
            width: 500, // 页面宽度
            height: 300 // 页面高度
        }
    }
    if (type === 'pie') {
        config.chartsOptions = {
            title: {
                text: 'Referer of a Website',
                subtext: 'Fake Data',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    } else {
        config.chartsOptions = {
            title: {
                text: '折线图堆叠'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '视频广告',
                    type: 'line',
                    stack: '总量',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: '直接访问',
                    type: 'line',
                    stack: '总量',
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: '搜索引擎',
                    type: 'line',
                    stack: '总量',
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        }
    }
    options.children.push(config)
}
</script>
