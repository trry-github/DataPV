<template>
    <page-main class="wrap">
        <ul class="left">
            <li v-for="item in list" :key="item" class="item">{{ item }}</li>
        </ul>
        <div class="right">
            <RenderBox class="item" :options="options" />
            <RenderBox class="item" :options="options1" />
        </div>
    </page-main>
</template>

<script setup>
import { ref, reactive } from 'vue'
import RenderBox from './components/RenderBox.vue'
const list = ref([
    '任务完成分布',
    '客户覆盖区域分布',
    '积分消耗情况',
    '客户覆盖职称分布',
    '医生单日学习时段分布趋势',
    '客户覆盖科室比例'
])

const options = reactive({
    id: 123,
    defaultType: 'Line',
    title: '任务完成分布'
})

const options1 = reactive({
    id: 456,
    defaultType: 'Pie',
    title: '客户覆盖区域分布'
})
</script>

<style lang="scss" scoped>
.wrap {
    display: flex;
    .left {
        flex-shrink: 0;
        padding-right: 40px;
        margin-right: 40px;
        border-right: 1px solid #ddd;
        .item {
            padding: 5px;
            border-radius: 3px;
            list-style: none;
            transition: all 0.3s;
            &:hover {
                background-color: #eee;
                cursor: pointer;
            }
        }
    }
    .right {
        width: 100%;
        height: 400px;
        display: flex;
        .item {
            flex: 1;
            padding: 0 20px;
        }
    }
}
</style>
