
<template>
    <div>
        <div id="topology" style="width: 100%; height: 100%;" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 网络拓扑结构数据
            topology1: {
                name: '平台',
                children: [
                    {
                        name: '7#配电房网关',
                        children: [
                            {
                                name: '004号',
                                value: null
                            },
                            {
                                name: '003号',
                                value: null
                            },
                            {
                                name: '1234',
                                value: null
                            }
                        ]
                    },
                    {
                        name: '9#配电房网关',
                        children: [
                            {
                                name: '22222222',
                                value: null
                            },
                            {
                                name: '444444444',
                                value: null
                            }
                        ]
                    },
                    {
                        name: '11#配电房网关',
                        children: []
                    }
                ],
                gatewayCount: 5,
                deviceCount: 5
            }
        }
    },
    mounted() {
        this.drawNetworkTopology()
    },
    methods: {
        // 绘制网络拓扑结构图
        drawNetworkTopology() {
            this.$nextTick(function() {
                // 基于准备好的dom，初始化echarts实例
                let topologyChart = this.$echarts.init(document.getElementById('topology'))
                // 监听窗口resize事件
                window.addEventListener('resize', topologyChart.resize)
                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: '网络拓扑图从左往右依次为：平台、网关、设备',
                        textAlign: 'auto',
                        textVerticalAlign: 'auto'
                    },
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove'
                    },
                    series: [
                        {
                            type: 'tree',
                            data: [this.topology1],
                            top: '0',
                            left: '50',
                            bottom: '0',
                            right: '150',
                            symbolSize: 12,
                            label: {
                                position: 'bottom',
                                align: 'center',
                                verticalAlign: 'middle',
                                offset: [0, 6],
                                fontSize: 14,
                                fontWeight: 'normal'
                            },
                            leaves: {
                                label: {
                                    position: 'bottom',
                                    align: 'center',
                                    verticalAlign: 'middle',
                                    offset: [0, 6],
                                    fontSize: 14,
                                    fontWeight: 'normal'
                                }
                            },
                            emphasis: {
                                focus: 'descendant'
                            },
                            expandAndCollapse: true,
                            animationDuration: 550,
                            animationDurationUpdate: 750
                        }
                    ]
                }
                topologyChart.resize()
                // 使用指定的配置项和数据显示图表。
                topologyChart.setOption(option, true)
            })
        }
    }
}
</script>
