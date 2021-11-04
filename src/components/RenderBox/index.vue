<template>
    <darg-box :key="configItem.id" v-model="configItemStyle" :is-active="configItem.id === $store.state.activeComponent.activeEle.id">
        <transition name="el-fade-in-linear">
            <component :is="components" :key="configItem.id" v-model="configItem" @click.stop="onSelectEle" />
        </transition>
    </darg-box>
</template>

<script setup name="RenderBox">
import { computed } from 'vue'
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
const emit = defineEmits(['change'])

const configItem = computed(() => props.options)
const configItemStyle = computed({
    get() {
        return props.options.style
    },
    set(val) {
        console.log('change', val)

        emit('change', val)
    }
})

const components = defineAsyncComponent(() => import(`../${configItem.value.name}/index.vue`))

const onSelectEle = () => {
    store.commit('activeComponent/setActiveEle', deepClone(configItem.value))
}

</script>
