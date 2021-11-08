<template>
    <div class="drow-page" @click="onClick">
        <RenderBox v-for="(item) in modelValue.children" :key="item.id" :options="item" @deal-right-click="deal" @change="updateModelValue" />
    </div>
</template>

<script setup name="DrowPage">
import { deepClone } from '@/util'
import { useStore } from 'vuex'
import RenderBox from './RenderBox/index.vue'
const store = useStore()
const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['update:modelValue'])

const onClick = () => {
    store.commit('screenData/setActiveEle', {})
}

// 修改样式
const updateModelValue = ({ id, style }) => {
    const componentList = props.modelValue.children.map(item => {
        if (item.id === id) {
            item.style = {
                ...item.style,
                ...style
            }
        }
        return item
    })
    emit('update:modelValue', { ...props.modelValue, ...{ children: componentList } })
}
// 处理右击菜单事件
const deal = ({ type, id }) => {
    console.log(type, id)
    const cloneModelValue = deepClone(props.modelValue)
    if (type === 'DELETE') {
        cloneModelValue.children = cloneModelValue.children.filter(item => {
            return item.id !== id
        })
        console.log(cloneModelValue)

        emit('update:modelValue', cloneModelValue)
    }
}
</script>

<style lang="scss" scoped>
.drow-page {
    width: v-bind("modelValue.width");
    height: v-bind("modelValue.height");
    position: relative;
    border: 1px dashed #ddd;
    transition: all 0.3s;
}
</style>
