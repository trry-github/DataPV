<template>
    <div ref="dargBoxDom" class="component-wrap" :class="{ 'act-status': isActive }" @tap="onTap" @swipe="onSwipe" @press="onPress" @panmove="onPanmove" @pinch="onPinch" @rotate="onRotate">
        <p v-show="isActive" class="zoom-point" />
        <p v-show="isActive" class="zoom-point" />
        <p v-show="isActive" class="zoom-point" />
        <p v-show="isActive" class="zoom-point" />
        <p v-show="isActive" class="zoom-point" />
        <p v-show="isActive" class="zoom-point" />
        <p v-show="isActive" class="zoom-point" />
        <p v-show="isActive" class="zoom-point" />
        <slot />
    </div>
</template>

<script setup name="DargBox">
import { computed, onMounted, ref } from 'vue'
import { addUnit } from '@/util'

import AnyTouch from 'any-touch'

const props = defineProps({
    isActive: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: Object,
        default: Object
    }
})
const emit = defineEmits(['update:modelValue'])
const dargBoxDom = ref(null)
const dargBoxStyle = computed({
    get() {
        return props.modelValue
    },
    set(val) {
        emit('update:modelValue', val)
    }
})
onMounted(() => {
    initAnyTouch()
})

let at = {}
const initAnyTouch = () => {
    at = new AnyTouch(dargBoxDom.value)
    at.on('hook:destroyed', () => {
        at.destroy()
    })
}
/**
 * 拖动事件
 * 调用时机：鼠标拖动图表时
 * @param {event} e
 */
const onPanmove = e => {
    dargBoxStyle.value.top = parseInt(dargBoxStyle.value.top + e.deltaY)
    dargBoxStyle.value.left = parseInt(dargBoxStyle.value.left + e.deltaX)
}
</script>

<style lang="scss" scoped>
.component-wrap {
    position: absolute;
    border: 1px solid transparent;
    padding: 1px;
    width: v-bind("addUnit(dargBoxStyle.width)");
    height: v-bind("addUnit(dargBoxStyle.height)");
    top: v-bind("addUnit(dargBoxStyle.top)");
    left: v-bind("addUnit(dargBoxStyle.left)");
    right: v-bind("addUnit(dargBoxStyle.right)");
    bottom: v-bind("addUnit(dargBoxStyle.bottom)");
    &:hover {
        @extend.act-status;
    }
}
.act-status {
    border: 1px dashed #41b883;
    .zoom-point {
        width: 4px;
        height: 4px;
        background-color: #41b883;
        margin: 0;
        position: absolute;
        &:nth-child(1) {
            top: -4px;
            left: -4px;
            cursor: nw-resize;
        }
        &:nth-child(2) {
            top: -4px;
            left: 50%;
            transform: translateX(-50%);
            cursor: n-resize;
        }
        &:nth-child(3) {
            top: -4px;
            left: 100%;
            cursor: ne-resize;
        }
        &:nth-child(4) {
            top: 50%;
            left: 100%;
            transform: translateY(-50%);
            cursor: e-resize;
        }
        &:nth-child(5) {
            bottom: -4px;
            left: 100%;
            cursor: nw-resize;
        }
        &:nth-child(6) {
            bottom: -4px;
            left: 50%;
            transform: translateX(-50%);
            cursor: n-resize;
        }
        &:nth-child(7) {
            bottom: -4px;
            left: -4px;
            cursor: ne-resize;
        }
        &:nth-child(8) {
            bottom: 50%;
            left: -4px;
            transform: translateY(-50%);
            cursor: e-resize;
        }
    }
}
</style>
