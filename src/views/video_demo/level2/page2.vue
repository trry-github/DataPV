<template>
    <div>
        <page-main>
            <iframe :src="href" frameborder="0" />
        </page-main>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
const href = ref(null)
onMounted(() => {
    href.value = 'http://172.16.0.245:8080/#/video-demo/page'
    // href.value = 'http://localhost:8080/academic/live-console/ea0a9821109cf21eca7052bd96148792?token=3_13e081c39cc74480b334f0633de4d89c_e83ea2de64d24d9eb32c3abb825aa6bc&d=1637028163013'
})
</script>

<style lang="scss" scoped>
iframe {
    width: 100%;
    height: 700px;
}
</style>
