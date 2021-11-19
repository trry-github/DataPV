<template>
    <video id="video" autoplay="autoplay" controls webkit-playsinline>
        <p class="warning">Your browser does not support HTML5 video.</p>
    </video>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import Hls from 'hls.js'

// const timer = null
let hls =  null
onMounted(() => {
    init()
})

function init() {
    // 获取 video 标签
    var video = document.getElementById('video')
    const videoUrl = 'https://play.yaomaitong.net/qxs-live/ea0a9821109cf21eca7052bd96148792_NLD540.m3u8'
    if (Hls.isSupported()) {
        // 实例化 Hls 对象
        hls = new Hls()
        // 传入路径
        hls.loadSource(videoUrl)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            video.play() // 调用播放 API
        })

        hls.on(Hls.Events.ERROR, function(event, data) {
            if (data.fatal) {
                switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        // try to recover network error
                        console.log('fatal network error encountered, try to recover')
                        hls.startLoad()
                        break
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        console.log('fatal media error encountered, try to recover')
                        hls.recoverMediaError()
                        break
                    default:
                        // cannot recover
                        hls.destroy()
                        break
                }
            }
        })
        // hls.on(Hls.Events.ERROR, function(E, data) {
        //     console.log('错误信息', E, data)
        //     clearInterval(timer)
        //     timer = setTimeout(() => {
        //         hls.attachMedia(video)
        //         hls.loadSource(videoUrl)
        //     }, 3000)
        // })
    } else {
        alert('不支持HLS')
    }
}

onUnmounted(() => {
    hls.destroy()
})
</script>

<style lang="scss" scoped>
#video {
    width: 100%;
    height: 200px;
}
</style>
