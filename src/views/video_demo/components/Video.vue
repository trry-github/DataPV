<template>
    <video id="myvideo" class="video-js vjs-default-skin">
        //湖南卫视视频流地址
        <source src="https://play.yaomaitong.net/qxs-live/ea0a9821109cf21eca7052bd96148792_NLD540.m3u8">
        <!-- <source src="rtmp://play.yaomaitong.net/qxs-live/ea0a9821109cf21eca7052bd96148792_NLD540"> -->
    </video>
</template>

<script setup>
import { onMounted } from 'vue'
import videojs from 'video.js'
onMounted(() => {
    let player = videojs('myvideo', {}, function() {
        console.log('videojs播放器初始化成功')
    })
    player.play()
})
</script>

<style lang="scss" scoped>
#myvideo {
    width: 100%;
    height: 100%;
}
</style>
