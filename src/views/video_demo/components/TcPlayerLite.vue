<template>
    <div id="id_test_video" style="width: 100%; height: 200px;" />
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    initTcPlayer()
})

function initTcPlayer() {
    new window.TcPlayer('id_test_video', {
        'm3u8': 'https://play.yaomaitong.net/qxs-live/ea0a9821109cf21eca7052bd96148792_NLD540.m3u8', // 请替换成实际可用的播放地址
        'flv': 'https://play.yaomaitong.net/qxs-live/ea0a9821109cf21eca7052bd96148792_NLD540.flv', // 增加了一个 flv 的播放地址，用于PC平台的播放 请替换成实际可用的播放地址
        'autoplay': true,      // iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
        wording: {
            1: '主播不在，先在直播间聊聊天吧~ ',
            2: '主播不在，先在直播间聊聊天吧~ ',
            4: '主播不在，先在直播间聊聊天吧~ ',
            13: '您观看的直播已结束',
            2032: '请求视频失败，请检查网络',
            2048: '请求m3u8文件失败，可能是网络错误或者跨域问题'
        },
        listener: msg => {
            console.log(msg)

        }
    })
}
</script>
