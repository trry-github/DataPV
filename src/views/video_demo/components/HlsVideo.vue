<template>
    <!-- controls -->
    <video id="video" controls autoplay webkit-playsinline disablePictureInPicture controlslist="nodownload noremoteplayback">
        <p class="warning">Your browser does not support HTML5 video.</p>
    </video>
    <el-button class="button" @click="fillScreen">全屏</el-button>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import Hls from 'hls.js'

// const timer = null
let hls = null
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
            video.liveSyncPosition() // 调用播放 API
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

    video.loadeddata = function(e) {
        console.log('首帧已经加载完成', e)
    }
}

function fillScreen() {
    var playerLive = document.getElementById('video')
    if (playerLive.requestFullscreen) {
        return playerLive.requestFullscreen()
    } else if (playerLive.webkitRequestFullScreen) {
        return playerLive.webkitRequestFullScreen()
    } else if (playerLive.mozRequestFullScreen) {
        return playerLive.mozRequestFullScreen()
    } else if (playerLive.msRequestFullscreen) {
        playerLive.msRequestFullscreen()
    }
    document.getElementById('video').play()
}

onUnmounted(() => {
    hls.destroy()
})
</script>

<style lang="scss" scoped>
#video {
    width: 100%;
    height: 200px;
    background-color: #333;

    //全屏按钮
    &::-webkit-media-controls-fullscreen-button {
        display: block;
    }
    //播放按钮
    &::-webkit-media-controls-play-button {
        // display: none;
    }
    //进度条
    &::-webkit-media-controls-timeline {
        display: none;
    }
    //观看的当前时间
    &::-webkit-media-controls-current-time-display {
        display: none;
    }
    //剩余时间
    &::-webkit-media-controls-time-remaining-display {
        display: none;
    }
    //音量按钮
    &::-webkit-media-controls-mute-button {
        // display: none;
    }
    &::-webkit-media-controls-toggle-closed-captions-button {
        // display: none;
    }
    //音量的控制条
    &::-webkit-media-controls-volume-slider {
        // display: none;
    }
    //所有控件
    &::-webkit-media-controls-enclosure {
        // display: none;
    }
}
</style>
