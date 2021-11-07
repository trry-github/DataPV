<template>
    <div ref="dargBoxDom" class="component-wrap" :class="{ 'act-status': isActive }" @click.right="rightClick" @click.left="leftClick" @panstart="onPanstart" @panend="emit('change', { id: id, style: styleOptions })" @panmove="onPanmove">
        <p v-for="item in 8" v-show="isActive" :key="item" class="zoom-point" />
        <slot />
    </div>
    <RightMenu v-if="$store.state" v-model="showMenu" />
</template>

<script setup name="DargBox">
import { onMounted, ref, watchEffect } from 'vue'
import { isUnit, unUnit } from '@/util'

import AnyTouch from 'any-touch'

import RightMenu from '../RightMenu/index.vue'

const props = defineProps({
    isActive: {
        type: Boolean,
        default: false
    },
    id: {
        type: String,
        required: true
    },
    options: {
        type: Object,
        default: Object
    }
})
const emit = defineEmits(['change'])
const dargBoxDom = ref(null)
const styleOptions = ref({})
const showMenu = ref(false)
watchEffect(() => {
    // 初始化样式
    for (let key in props.options) {
        styleOptions.value[key] = unUnit(props.options[key])
    }
})
watchEffect(() => {
    if (!props.isActive)showMenu.value = props.isActive
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

const rightClick = () => {
    if (!props.isActive) return
    showMenu.value = true
}
const leftClick = () => {
    console.log('leftClick')

    showMenu.value = false
}
/**
 * 拖动事件
 * 调用时机：鼠标拖动图表时
 * @param {event} e
 */
const onPanmove = e => {
    styleOptions.value.top = parseInt((styleOptions.value.top || 0) + e.deltaY)
    styleOptions.value.left = parseInt((styleOptions.value.left || 0) + e.deltaX)
}
</script>

<style lang="scss" scoped>
.component-wrap {
    position: absolute;
    transform-origin: center center;
    border: 1px solid transparent;
    padding: 1px;
    width: v-bind("isUnit(styleOptions.width)");
    height: v-bind("isUnit(styleOptions.height)");
    top: v-bind("isUnit(styleOptions.top)");
    left: v-bind("isUnit(styleOptions.left)");
    right: v-bind("isUnit(styleOptions.right)");
    bottom: v-bind("isUnit(styleOptions.bottom)");
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
