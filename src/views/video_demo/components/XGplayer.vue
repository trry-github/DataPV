<template>
    <div id="vs" style="width: 100%; height: 200px;" />
</template>

<script setup>
import { onMounted } from 'vue'
// import Player from 'xgplayer'
// import FlvPlayer from 'xgplayer-flv'
import HlsPlayer from 'xgplayer-hls'
// import play from 'xgplayer/dist/controls/play'
// import fullscreen from 'xgplayer/dist/controls/fullscreen'
// import progress from 'xgplayer/dist/controls/progress'
// import volume from 'xgplayer/dist/controls/volume'
// import pip from 'xgplayer/dist/controls/pip'
// import flex from 'xgplayer/dist/controls/flex'

let xg = null
onMounted(() => {
    xg = new HlsPlayer({
        id: 'vs',
        autoplay: true,
        url: 'https://play.yaomaitong.net/qxs-live/ea0a9821109cf21eca7052bd96148792_NLD540.m3u8',
        isLive: true, // 直播场景设置为true
        fluid: true,
        fitVideoSize: 'auto',
        videoInit: true,
        allowSeekPlayed: true,
        'x5-video-player-type': 'h5',
        ignores: ['time', 'i18n', 'mobile', 'pc', 'poster', 'progress', 'replay']
        // controlPlugins: [play, fullscreen, progress, volume, pip, flex]
    })
    register()
})

function register() {
    xg.on('canplay', () => {
        console.log('canplay')
    })
    xg.on('error', () => {
        console.log('error')
        setTimeout(() => {
            xg.reload()
        }, 3000)
    })
    xg.on('ended', () => {
        console.log('ended')
        xg.reload()
    })
}
</script>
