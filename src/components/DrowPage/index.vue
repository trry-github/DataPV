<template>
    <div class="drow-page" @click="onClick">
        <RenderBox v-for="item in options.children" :key="item.id" :options="item" />
    </div>
</template>

<script setup name="DrowPage">
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['update:modelValue'])
const options = computed({
    get() {
        return props.modelValue
    },
    set(val) {
        emit('update:modelValue', val)
    }
})

const onClick = () => {
    store.commit('activeComponent/setActiveEle', {})
}
</script>

<style lang="scss" scoped>
.drow-page {
    width: v-bind("props.modelValue.width");
    height: v-bind("props.modelValue.height");
    position: relative;
    border: 1px dashed red;
    // background-color: var(--el-color-primary);
}
</style>
