<template>
    <page-main class="wrap">
        <DPlayer />

        <HlsVideo />
        <MuiPlayer />
        <!-- <Test /> -->
    </page-main>
</template>
<script setup>
import DPlayer from './components/DPlayer.vue'
import HlsVideo from './components/HlsVideo.vue'
import MuiPlayer from './components/muiPlayer.vue'
// import Test from './components/test.vue'
</script>

<style lang="scss" scoped>
.wrap {
    display: grid;
    gap: 10px;
}
</style>
