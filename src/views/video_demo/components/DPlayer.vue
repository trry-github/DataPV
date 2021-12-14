<template>
    <div class="dplayer-wrap">
        <!-- <img v-if="dataMap.loadError&&dataMap.playEnd" class="poster" src="https://img.soogif.com/Y9smF83Qc3N4eA412AtqdA2v9JsDMZUh.gif" alt=""> -->
        <div id="dplayer" />
    </div>
</template>

<script setup name="Dplayer">
import { onMounted, onUnmounted, reactive } from 'vue'
import DPlayer from 'dplayer'
import Hls from 'hls.js'

let dp = null
let timer = null
const dataMap = reactive({
    loadError: false,
    playEnd: false
})
const hls = new Hls()
onMounted(() => {
    initDplayer()
})

function initDplayer() {
    const options = {
        container: document.getElementById('dplayer'),
        live: true,
        autoplay: true,
        video: {
            type: 'customHls',
            // url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
            url: 'https://play.yaomaitong.net/qxs-live/ea0a9821109cf21eca7052bd96148792_NLD540.m3u8', // 示例地址
            customType: {
                customHls: function(video) {
                    hls.loadSource(video.src)
                    hls.attachMedia(video)
                }
            }
            // url: 'http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8'
            // url: 'rtmp://play.yaomaitong.net/qxs-live/ea0a9821109cf21eca7052bd96148792_NLD540'
            // url: 'webrtc://play.yaomaitong.net/qxs-live/ea0a9821109cf21eca7052bd96148792_NLD540'
            // url: 'https://play.yaomaitong.net/qxs-live/ea0a9821109cf21eca7052bd96148792_NLD540.flv'
        }
    }
    dp = new DPlayer(options)

    // media(dp.video)
    registerEvent(dp)
}
function registerEvent(dp) {
    dp.on('canplay', () => {
        dataMap.loadError = false
        console.log('canplay')
        clearTimeout(timer)
        timer = null
    })
    dp.on('timeupdate', () => {
        const duration = dp.video.duration || 0
        console.log('timeupdate', dp.video.currentTime, duration)
        const currentTime = parseFloat(dp.video.currentTime)
        if (currentTime === duration && dp.video.currentTime !== 0 && duration !== 0) {
            console.log('播放结束了')
            dataMap.playEnd = true
        } else {
            dataMap.playEnd = false
        }
    })
    dp.on('fullscreen', () => {
        console.log('fullscreen')
    })
    dp.on('fullscreen_cancel', () => {
        console.log('fullscreen_cancel')
    })
}

onUnmounted(() => {
    hls.destroy()
    dp.destroy()
})
</script>

<style lang="scss" scoped>
.dplayer-wrap {
    width: 100%;
    height: 200px;
    position: relative;
    .poster {
        width: 100%;
        height: 200px;
        position: absolute;
        top: 0;
        z-index: 1;
    }
    #dplayer {
        width: 100%;
        height: 100%;
    }
}
</style>
