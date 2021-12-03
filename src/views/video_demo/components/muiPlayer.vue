<template>
    <div id="mui-player" />
</template>

<script setup name="MuiPlayer">
import { onMounted } from 'vue'
import 'mui-player/dist/mui-player.min.css'
import MuiPlayer from 'mui-player'
// 使用模块管理器引入插件
import MuiPlayerDesktopPlugin from 'mui-player-desktop-plugin'

import Hls from 'hls.js'
// import Flv from 'flv.js'

onMounted(() => {
    // 初始化 MuiPlayer 插件，MuiPlayer 方法传递一个对象，该对象包括所有插件的配置
    var mp = new MuiPlayer({
        container: '#mui-player',
        title: 'Title',
        live: true,
        autoplay: true,
        src: 'https://play.yaomaitong.net/qxs-live/ea0a9821109cf21eca7052bd96148792_NLD540.m3u8',
        parse: {
            type: 'hls',
            loader: Hls,
            config: {
                debug: false
            }
        },
        plugins: [
            new MuiPlayerDesktopPlugin({
                leaveHiddenControls: true
            })
        ]
    })
    console.log(mp)
    // 监听播放器已创建完成
    mp.on('ready', function(event) {
        console.log(event)
    })
    mp.on('error', function() {
        console.log('error')

    })
    mp.on('destory', function() {
        console.log('destory')

    })
    mp.video.onload = function() {

        setTimeout(() => {
            mp.reloadUrl()
        }, 3000)
        console.log('hlsError')
    }
})
</script>

<style lang="scss" scoped>
//scss
</style>
