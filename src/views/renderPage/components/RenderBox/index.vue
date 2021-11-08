<template>
    <darg-box :id="options.id" :options="options.style" :is-active="isActive" v-bind="$attrs">
        <component :is="components" :key="options.id" :options="options" @click.stop="onSelectEle" />
    </darg-box>
</template>

<script setup name="RenderBox">
import { useStore } from 'vuex'
import { deepClone } from '@/util'
import DargBox from './DargBox/index.vue'

const store = useStore()
const props = defineProps({
    options: {
        type: Object,
        required: true
    }
})
const isActive = computed(() => props.options.id === store.state.screenData.activeEle.id)
const components = defineAsyncComponent(() => import(`../../../../components/${props.options.name}/index.vue`))

/**
 * 选择组件，存在store中
 * 调用时机：单机组件
 */
const onSelectEle = () => {
    store.commit('screenData/setActiveEle', deepClone(props.options))
}
</script>
