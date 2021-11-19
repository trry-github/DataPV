<template>
    <div id="vs" style="width: 100%;height: 200px;" />
</template>

<script setup>
import { onMounted } from 'vue'
import Player from 'xgplayer'

onMounted(() => {
    new Player({
        id: 'vs',
        url: 'https://play.yaomaitong.net/qxs-live/ea0a9821109cf21eca7052bd96148792_NLD540.m3u8',
        isLive: true, // 直播场景设置为true
        useHls: true,
        hlsOpts: {
            xhrSetup: function(xhr) {
                xhr.withCredentials = true
            }
        } // hls.js可选配置项
    })
})
</script>
