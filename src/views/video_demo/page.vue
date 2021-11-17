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
    padding: 0;
    margin: 0;
    width: 100%;
    display: grid;
    grid-template-rows: auto auto 200px;
    gap: 20px;
    >div {
        flex: 1;
    }
}
</style>
