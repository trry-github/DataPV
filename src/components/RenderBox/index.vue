<template>
    <div class="component-wrap">
        <component :is="components" :key="options.id" :options="options" @click="drawer = true" />
    </div>
</template>

<script setup name="RenderBox">
import {  defineProps } from 'vue'

const props = defineProps({
    options: {
        type: Object,
        required: true
    }
})

console.log(props.options)

const components = defineAsyncComponent(() => import(`../${props.options.name}/index.vue`))

</script>

<style lang="scss" scoped>
.component-wrap {
    position: absolute;
    border: 1px solid transparent;
    padding: 1px;
    width: v-bind("props.options.style.width");
    height: v-bind("props.options.style.height");
    top: v-bind("props.options.style.top");
    left: v-bind("props.options.style.left");
    right: v-bind("props.options.style.right");
    bottom: v-bind("props.options.style.bottom");
    &:hover {
        border: 1px solid #41b883;
    }
}
</style>
