<template>
    <component :is="getComponent(item.name)" v-for="item in options.children" :key="item.id" :options="item" />
</template>

<script setup name="RenderBox">
import { computed } from 'vue'

const props = defineProps({
    value: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['value:update'])
const options = computed({
    get() {
        return props.value
    },
    set(val) {
        emit('value:update', val)
    }
})

const getComponent = name => {
    return defineAsyncComponent(() => import(`../${name}/index.vue`))
}

console.log(props.value)

</script>
