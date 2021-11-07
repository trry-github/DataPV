<template>
    <ul v-if="visible" class="right-menu">
        <li class="item">123</li>
        <li class="item">删除</li>
    </ul>
</template>

<script setup name="RightMenu">
import { computed } from 'vue'
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['update:modelValue'])
let visible = computed({
    get() {
        return props.modelValue
    },
    set(val) {
        emit('update:modelValue', val)
    }
})

</script>

<style lang="scss" scoped>
.right-menu {
    padding: 0;
    margin: 0;
    .item {
        list-style: none;
    }
}
</style>
