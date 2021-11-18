<template>
    <div id="dplayer" style="width: 100%;height: 200px;" />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import DPlayer from 'dplayer'
import Hls from 'hls.js'

let dp = null
let timer = null
const hls = new Hls()
onMounted(() => {
    initDplayer()

})

onMedia
function onMedia(Media) {
    // Media.error // null:正常
    // Media.error.code; // 1.用户终止 2.网络错误 3.解码错误 4.URL无效
    // 网络状态
    // - Media.currentSrc; //返回当前资源的URL
    // - Media.src = value; //返回或设置当前资源的URL
    // - Media.canPlayType(type); //是否能播放某种格式的资源
    // - Media.networkState; //0.此元素未初始化 1.正常但没有使用网络 2.正在下载数据 3.没有找到资源
    // - Media.load(); //重新加载src指定的资源
    // - Media.buffered; //返回已缓冲区域，TimeRanges
    // - Media.preload; //none:不预载 metadata:预载资源信息 auto:准备状态
    // - Media.readyState;//1:HAVE_NOTHING 2:HAVE_METADATA 3.HAVE_CURRENT_DATA 4.HAVE_FUTURE_DATA 5.HAVE_ENOUGH_DATA

    // - Media.seeking // 是否正在seeking
    // 回放状态
    // Media.currentTime = value // 当前播放的位置，赋值可改变位置
    // Media.startTime // 一般为0，如果为流媒体或者不从0开始的资源，则不为0
    // Media.duration // 当前资源长度 流返回无限
    // Media.paused // 是否暂停
    // Media.defaultPlaybackRate = value// 默认的回放速度，可以设置
    // Media.playbackRate = value// 当前播放速度，设置后马上改变
    // Media.played // 返回已经播放的区域，TimeRanges，关于此对象见下文
    // Media.seekable // 返回可以seek的区域 TimeRanges
    // Media.ended // 是否结束
    // Media.autoPlay // 是否自动播放
    // Media.loop // 是否循环播放
    // Media.play() // 播放
    // Media.pause() // 暂停
    // 视频控制
    // Media.controls// 是否有默认控制条
    // Media.volume = value // 音量
    // Media.muted = value // 静音
    // TimeRanges('区域')// 对象
    // TimeRanges.length // 区域段数
    // TimeRanges.start(index) // 第index段区域的开始位置
    // TimeRanges.end(index) // 第index段区域的结束位置

    console.dir(Media.error)

    Media.onerror = function() {
        alert('Error! 出错了')
    }
    // 相关事件
    var eventTester = function(e) {
        Media.addEventListener(e, function() {
            console.log((new Date()).getTime(), e)
        }, false)

    }

    eventTester('loadstart') // 客户端开始请求数据
    eventTester('progress') // 客户端正在请求数据
    eventTester('suspend') // 延迟下载
    eventTester('abort') // 客户端主动终止下载（不是因为错误引起）
    eventTester('loadstart') // 客户端开始请求数据
    eventTester('progress') // 客户端正在请求数据
    eventTester('suspend') // 延迟下载
    eventTester('abort') // 客户端主动终止下载（不是因为错误引起），
    eventTester('error') // 请求数据时遇到错误
    eventTester('stalled') // 网速失速
    eventTester('play') // play()和autoplay开始播放时触发
    eventTester('pause') // pause()触发
    eventTester('loadedmetadata') // 成功获取资源长度
    eventTester('loadeddata') //
    eventTester('waiting') // 等待数据，并非错误
    eventTester('playing') // 开始回放
    eventTester('canplay') // 可以播放，但中途可能因为加载而暂停
    eventTester('canplaythrough') // 可以播放，歌曲全部加载完毕
    eventTester('seeking') // 寻找中
    eventTester('seeked') // 寻找完毕
    eventTester('timeupdate') // 播放时间改变
    eventTester('ended') // 播放结束
    eventTester('ratechange') // 播放速率改变
    eventTester('durationchange') // 资源长度改变
    eventTester('volumechange') // 音量改变

}

function initDplayer() {
    const options = {
        container: document.getElementById('dplayer'),
        live: true,
        autoplay: true,
        lang: 'zh-cn',
        video: {
            type: 'customHls',
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

    // 监听拉流状态
    hls.on(Hls.Events.ERROR, function(E, data) {
        console.log('错误信息', E, data)

        clearInterval(timer)
        timer = setTimeout(() => {
            hls.attachMedia(dp.video)
            hls.loadSource(options.video.url)
        }, 3000)

    })

    // media(dp.video)
    registerEvent(dp)
}
function registerEvent(dp) {
    dp.on('abort', () => {
        console.log('abort')

    })
    dp.on('canplay', () => {
        console.log('canplay')
        clearTimeout(timer)
        timer = null
    })
    dp.on('canplaythrough', () => {
        console.log('canplaythrough')

    })
    dp.on('durationchange', e => {
        console.log('durationchange', '当视频的时长数据发生变化时触发', e)

    })
    dp.on('emptied', e => {
        console.log('emptied', e)

    })
    dp.on('ended', e => {
        console.log('ended', e)

    })
    dp.on('error', e => {
        console.log('error', e)

    })
    dp.on('loadeddata', e => {
        console.log('loadeddata', e)

    })
    dp.on('loadstart', e => {
        console.log('loadstart', e)

    })
    dp.on('mozaudioavailable', e => {
        console.log('mozaudioavailable', e)

    })
    dp.on('pause', e => {
        console.log('pause', e)

    })
    dp.on('play', e => {
        console.log('play', e)

    })
    dp.on('playing', e => {
        console.log('playing', e)

    })
    dp.on('progress', e => {
        console.log('progress', e)

    })
    dp.on('ratechange', e => {
        console.log('ratechange', e)

    })
    dp.on('seeked', e => {
        console.log('seeked', e)

    })
    dp.on('seeking', e => {
        console.log('seeking', e)

    })
    dp.on('stalled', e => {
        console.log('stalled', e)

    })
    dp.on('suspend', e => {
        console.log('suspend', e)

    })
    dp.on('timeupdate', () => {
        if (dp.video.duration  - dp.video.currentTime === 0) {
            console.log('播放结束了')

        }
        console.log('timeupdate', { currentTime: dp.video.currentTime, duration: dp.video.duration })

    })
    dp.on('volumechange', e => {
        console.log('volumechange', '体积变更', e)

    })
    dp.on('waiting', e => {
        console.log('waiting', e)

    })
}

onUnmounted(() => {
    hls.destroy()
    dp.destroy()
})
</script>
