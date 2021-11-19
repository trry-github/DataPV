<template>
    <div id="id_test_video" style="width: 100%; height: 200px;" />
</template>

<script setup>
// 在ios下无法监听错误，所以不能使用
import { onMounted } from 'vue'
let tcplayer = ''
onMounted(() => {
    initTcPlayer()
})

function initTcPlayer() {
    tcplayer = new window.TcPlayer('id_test_video', {
        'm3u8': 'https://play.yaomaitong.net/qxs-live/ea0a9821109cf21eca7052bd96148792_NLD540.m3u8', // 请替换成实际可用的播放地址
        // 'flv': 'https://play.yaomaitong.net/qxs-live/ea0a9821109cf21eca7052bd96148792_NLD540.flv', // 增加了一个 flv 的播放地址，用于PC平台的播放 请替换成实际可用的播放地址
        'autoplay': true,
        wording: {
            1: '主播不在，先在直播间聊聊天吧~ ',
            2: '主播不在，先在直播间聊聊天吧~ ',
            4: '主播不在，先在直播间聊聊天吧~ ',
            13: '您观看的直播已结束',
            2032: '请求视频失败，请检查网络',
            2048: '请求m3u8文件失败，可能是网络错误或者跨域问题'
        },
        listener: msg => {
            switch (msg.type) {
                case 'error':
                    onPlayError(msg.detail)
                    break
                case 'timeupdate':
                    ontimeupdate(msg)
            }
        }
    })
}

function onPlayError(data) {
    console.log('tcplayer error', data)

    setTimeout(() => {
        tcplayer.load()
    }, 3000)
}
function ontimeupdate() {
    // 直播结束后无法监听具体时间
    console.log('tcplayer ontimeupdate', tcplayer.duration(), tcplayer.currentTime())

}
</script>
