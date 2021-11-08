<template>
    <ul v-if="visible" class="right-menu">
        <li class="item">123</li>
        <li class="item" @click="$emit('onDeal',{type:'DELETE'})">删除</li>
    </ul>
</template>

<script setup name="RightMenu">
import { computed } from 'vue'
import { isUnit } from '@/util'
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    positionStyle: {
        type: Object,
        default: () => ({
            left: '0px',
            top: '0px'
        })
    }
})
const emit = defineEmits(['update:modelValue', 'onDeal'])
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
    width: 150px;
    line-height: 35px;
    padding: 0;
    margin: 0;
    background-color: #fff;
    border-radius: 3px;
    border: 1px solid #ddd;
    font-size: 14px;
    position: absolute;
    left: v-bind("isUnit(positionStyle.left)");
    top: v-bind("isUnit(positionStyle.top)");
    transition: all 0.3s;
    .item {
        list-style: none;
        padding: 0 15px;
        cursor: pointer;
        &:hover {
            background-color: #eee;
            transition: all 0.3s;
        }
    }
}
</style>
