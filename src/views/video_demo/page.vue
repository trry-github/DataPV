<template>
    <page-main class="wrap">
        <DPlayer />
        <!-- <TcPlayerLite /> -->
    </page-main>
</template>
<script setup>
import DPlayer from './components/Dplayer.vue'
// import TcPlayerLite from './components/TcPlayerLite.vue'
</script>

<style lang="scss" scoped>
.wrap {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    gap: 20px;
    >div {
        flex: 1;
    }
}
</style>
