<template>
    <page-main class="wrap">
        <div class="custom-tree-node-container">
            <el-tree :data="dataSource" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false" :props="{ class: customNodeClass }" />
        </div>
        <div>
            <el-button type="primary" @click="$router.push({ name: 'DataExample' })">
                生成图表
            </el-button>
        </div>
    </page-main>
</template>

<script setup>
import { ref } from 'vue'
const data = [
    {
        id: 1,
        label: '线上科室会',
        children: [
            {
                id: 4,
                label: '西安部门',
                isPenultimate: true,
                children: [
                    {
                        id: 9,
                        label: '辉瑞团队',
                        children: [
                            {
                                id: 111,
                                label: '感冒药',
                                children: [
                                    {
                                        id: 1111,
                                        label: '任务完成分布'
                                    },
                                    {
                                        id: 1112,
                                        label: '客户覆盖区域分布'
                                    },
                                    {
                                        id: 1112,
                                        label: '积分消耗情况'
                                    },
                                    {
                                        id: 1112,
                                        label: '客户覆盖职称分布'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 10,
                        label: '药剂科'
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        label: '定向直播',
        isPenultimate: true,
        children: [
            {
                id: 5,
                label: '瓜皮大区'
            },
            {
                id: 6,
                label: '延安部门'
            }
        ]
    },
    {
        id: 3,
        label: '多人会议',
        isPenultimate: true,
        children: [
            {
                id: 7,
                label: '洛川部门'
            },
            {
                id: 8,
                label: '测试部门'
            }
        ]
    }
]
const dataSource = ref(JSON.parse(JSON.stringify(data)))
const customNodeClass = data => {
    if (data.isPenultimate) {
        return 'is-penultimate'
    }
    return null
}
</script>

<style lang="scss" scoped>
.wrap {
    display: flex;
    .custom-tree-node-container {
        padding-right: 40px;
        margin-right: 40px;
        border-right: 1px solid #ddd;
    }
}
</style>
