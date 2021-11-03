<template>
    <div ref="dargBoxDom" class="component-wrap" :class="{'act-status': isActive}" @tap="onTap" @swipe="onSwipe" @press="onPress" @pan="onPan" @pinch="onPinch" @rotate="onRotate">
        <slot />
    </div>
</template>

<script setup name="DargBox">
import { onMounted, ref } from 'vue'
import AnyTouch from 'any-touch'

const props = defineProps({
    isActive: {
        type: Boolean,
        default: false
    },
    styleOptions: {
        type: Object,
        default: Object
    }
})
const at = ref({})
const dargBoxDom = ref(null)
onMounted(() => {
    initAnyTouch()
})

const initAnyTouch = () => {
    at.value = new AnyTouch(dargBoxDom.value)
    at.value.on('pan', e => {
        console.log(e.distanceX, e.distanceY)

    })
    at.value.on('hook:destroyed', () => { at.value.destroy() })
}

console.log(props.styleOptions)
</script>

<style lang="scss" scoped>
.component-wrap {
    position: absolute;
    border: 1px solid transparent;
    padding: 1px;
    width: v-bind("props.styleOptions.width");
    height: v-bind("props.styleOptions.height");
    top: v-bind("props.styleOptions.top");
    left: v-bind("props.styleOptions.left");
    right: v-bind("props.styleOptions.right");
    bottom: v-bind("props.styleOptions.bottom");
    &:hover {
        @extend.act-status;
    }
}
.act-status {
    border: 1px dashed #41b883;
}

</style>
