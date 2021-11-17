<template>
    <video id="example-video" width="600" height="300" class="video-js vjs-default-skin" controls>
        <source
            src="https://play.yaomaitong.net/qxs-live/ea0a9821109cf21eca7052bd96148792_NLD540.m3u8"
            type="application/x-mpegURL"
        >
    </video>
</template>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
    // var player = window.videojs('example-video')
    // player.play()
})
</script>
