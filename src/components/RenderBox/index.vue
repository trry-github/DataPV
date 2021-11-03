<template>
    <darg-box :style-options="options.style" :is-active="options.id === $store.state.activeComponent.activeEle.id">
        <transition name="el-fade-in-linear">
            <component :is="components" :key="options.id" :options="options" @click.stop="onSelectEle" />
        </transition>
    </darg-box>
</template>

<script setup name="RenderBox">
import { useStore } from 'vuex'

import DargBox from './DargBox/index.vue'

const store = useStore()
const props = defineProps({
    options: {
        type: Object,
        required: true
    }
})

const components = defineAsyncComponent(() => import(`../${props.options.name}/index.vue`))

const onSelectEle = () => {
    store.commit('activeComponent/setActiveEle', props.options)
}
</script>
