<template>
    <page-main class="wrap">
        <LivePlayer type="live">
            <template #cover="slotScoped">
                <p v-if="slotScoped.playEnd">封面</p>
            </template>
        </LivePlayer>
        <!-- <DPlayer />

        <HlsVideo />
        <MuiPlayer /> -->
        <!-- <XGplayer /> -->
    </page-main>
</template>
<script setup>
// import DPlayer from './components/DPlayer.vue'
// import HlsVideo from './components/HlsVideo.vue'
// import MuiPlayer from './components/muiPlayer.vue'
// import XGplayer from './components/XGplayer.vue'
import LivePlayer from './components/LivePlayer/index.vue'
// import Test from './components/test.vue'
</script>

<style lang="scss" scoped>
.wrap {
    display: grid;
    gap: 10px;
}
</style>
