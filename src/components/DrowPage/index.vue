<template>
    <div class="drow-page">
        <RenderBox v-for="item in options.children" :key="item.id" :options="item" />
    </div>
</template>

<script setup name="DrowPage">
import { computed, defineEmits } from 'vue'
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
</script>

<style lang="scss" scoped>
.drow-page {
    width: v-bind("props.modelValue.width");
    height: v-bind("props.modelValue.height");
    // background-color: var(--el-color-primary);
}
</style>
