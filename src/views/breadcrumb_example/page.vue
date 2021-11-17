<template>
    <page-main>
        <div class="wrap">
            <RenderBox :options="options" />
        </div>
    </page-main>
</template>

<script setup>
import { reactive } from 'vue'
import RenderBox from './components/RenderBox.vue'
import { globalVariable } from '@/util/global.properties'
const { $nanoid } = globalVariable
const options = reactive({
    id: $nanoid(),
    defaultType: 'Bar',
    title: '折线图堆叠'
})

</script>

<style lang="scss" scoped>
.wrap {
    height: 500px;
    box-sizing: border-box;
}
</style>
