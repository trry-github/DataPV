<template>
    <div class="dplayer-wrapper">
        <div id="dplayer" />
        <slot name="cover" :playEnd="loadError" />
    </div>
</template>

<script setup name="LivePlayer">
import { onMounted, reactive, onUnmounted, ref } from 'vue'
import DPlayer from 'dplayer'
import Hls from 'hls.js'
import flvjs from 'flv.js'
// hooks
import useFlvPlayer from './flvPlayer.js'
import useHlsPlayer from './hlsPlayer.js'
import useMp4Video from './mp4Player.js'
const props = defineProps({
    type: {
        type: String,
        default: 'live'
    },
    videoUrl: {
        type: Object,
        default: Object
    },
    liveUrl: {
        type: Array,
        default: () => ['https://play.yaomaitong.net/qxs-live/ea0a9821109cf21eca7052bd96148792_NLD540.flv', 'https://play.yaomaitong.net/qxs-live/ea0a9821109cf21eca7052bd96148792_NLD540.m3u8', 'rtmp://play.yaomaitong.net/qxs-live/ea0a9821109cf21eca7052bd96148792_NLD540', 'webrtc://play.yaomaitong.net/qxs-live/ea0a9821109cf21eca7052bd96148792_NLD540']
    }
})

const emit = defineEmits(['ended', 'play', 'pause', 'error'])

let dp = ref('')
let timer = null
const loadError = ref(true)
const defaultOptions = reactive({
    container: '',
    autoplay: true,
    live: false,
    preload: false,
    video: {
        defaultQuality: 0
    },
    pluginOptions: {}
})

// hooks
const { initVideo } = useMp4Video(props.videoUrl, defaultOptions)
const { unInstallHlsEvent, initHls } = useHlsPlayer({ dp, timer, filterUrl, defaultOptions, loadError, emit })
const { initFlvPlayer, unInstallFlvPlayerEvent, flvPlayer } = useFlvPlayer({ defaultOptions, loadError, emit, filterUrl, timer })

onMounted(() => {
    defaultOptions.container = document.getElementById('dplayer')
    if (props.type === 'playback') {
        defaultOptions.live = false
        initVideo(defaultOptions, initDplayer)
    } else if (props.type === 'live') {
        defaultOptions.live = true
        if (videoFormat('flv')) {
            initFlvPlayer(defaultOptions, initDplayer)
        } else if (videoFormat('m3u8')) {
            initHls(defaultOptions, initDplayer)
        }
    }
    registerDplayerEvent()
})

onUnmounted(() => {
    clearTimeout(timer)
    timer = null
    if (props.type === 'playback') {
        console.log('playback')
    } else if (props.type === 'live') {
        if (videoFormat('flv')) {
            unInstallFlvPlayerEvent()
        } else if (videoFormat('m3u8')) {
            unInstallHlsEvent()
        }
    }
    dp.value.destroy()
})

function initDplayer(options = defaultOptions) {
    dp.value = new DPlayer(options)
}
function registerDplayerEvent() {
    // 视频初始化完成，可以播放
    dp.value.on('canplay', () => {
        console.log('canplay')
        clearTimeout(timer)
        timer = null
        loadError.value = false
        setTimeout(() => {
            if (dp.value.video.paused) {
                dp.value.video.play()
            }
        }, 200)
    })
    // 视频正在播放
    dp.value.on('timeupdate', () => {})
    dp.value.on('ended', () => {
        if (props.type === 'playback') {
            console.log('playback')
        } else if (props.type === 'live') {
            if (videoFormat('flv')) {
                flvPlayer.unload()
                flvPlayer.load()
            } else if (videoFormat('m3u8')) {
                // this.unInstallHlsEvent()
            }
        }
        console.log('ended')
        emit('ended')
    })
    dp.value.on('play', () => {
        emit('play')
    })
    dp.value.on('pause', () => {
        emit('pause')
    })
    dp.value.on('error', () => {
        console.log('dp-error')
        emit('error')
    })
}
// 判断播放格式
function videoFormat(type) {
    if (type === 'flv') {
        //  && !navigator.userAgent.indexOf('Safari') > -1
        return flvjs.isSupported()
    } else if (type === 'm3u8') {
        return Hls.isSupported()
    }
}

function filterUrl(type) {
    let url = ''
    props.liveUrl.forEach(item => {
        if (item.indexOf(type) !== -1) {
            url = item
        }
    })
    return url
}
</script>

<style lang="scss" scoped>
.dplayer-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    #dplayer {
        width: 100%;
        height: 100%;
        :deep(.dplayer-menu.dplayer-menu-show) {
            display: none !important;
        }
        :deep(.dplayer-quality) {
            display: none !important;
        }
    }
}
</style>