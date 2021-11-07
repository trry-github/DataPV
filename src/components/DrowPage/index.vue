<template>
    <div class="drow-page" @click="onClick">
        <RenderBox v-for="(item) in modelValue.children" :key="item.id" :options="item" @change="updateModelValue" />
    </div>
</template>

<script setup name="DrowPage">
import { useStore } from 'vuex'
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
