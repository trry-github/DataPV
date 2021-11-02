<template>
    <page-main class="drow-page">
        <div class="wrapper">
            <RenderBox v-model:value="options" />
        </div>
    </page-main>
</template>

<script setup name="DrowPage">
import { computed, defineEmits } from 'vue'

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
    set(val = {}) {
        emit('value:update', val)
    }
})

</script>

<style lang="scss" scoped>
.drow-page {
    width: v-bind("props.value.width");
    height: v-bind("props.value.height");
}
</style>
