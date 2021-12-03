
import flvjs from 'flv.js'
export default function useFlvPlayer({ defaultOptions, loadError, emit, filterUrl, timer }) {
    let flvPlayer = null
    /**
     * 初始化 flv 播放器
     */
    function initFlvPlayer(options = defaultOptions, fun) {
        options.video.type = 'customFlv'
        options.video.url = filterUrl('.flv')
        options.video.customType = {
            customFlv: video => {
                flvPlayer = flvjs.createPlayer(
                    {
                        type: 'flv',
                        isLive: true,
                        url: video.src
                    },
                    {
                        autoCleanupSourceBuffer: true, // 对SourceBuffer进行自动清理
                        autoCleanupMaxBackwardDuration: 12, //    当向后缓冲区持续时间超过此值（以秒为单位）时，请对SourceBuffer进行自动清理
                        autoCleanupMinBackwardDuration: 8, // 指示进行自动清除时为反向缓冲区保留的持续时间（以秒为单位）。
                        enableStashBuffer: false, // 关闭IO隐藏缓冲区
                        isLive: true,
                        lazyLoad: false
                    }
                )
                flvPlayer.attachMediaElement(video)
                flvPlayer.load()
            }
        }
        fun()
        registerFlvPlayerEvent()
    }
    /**
     * 注册 flv 播放器事件
     */
    function registerFlvPlayerEvent() {
        flvPlayer.on(flvjs.Events.ERROR, () => {
            console.log('视频错误信息回调')
            emit('error')
            loadError.value = true
            clearInterval(timer)
            timer = null
            timer = setTimeout(() => {
                flvPlayer.unload()
                flvPlayer.load()
            }, 3000)
        })
    }
    /**
     * 卸载 flv 播放器事件
     */
    function unInstallFlvPlayerEvent() {
        flvPlayer.pause()
        flvPlayer.unload()
        flvPlayer.detachMediaElement()
        flvPlayer.destroy()
        flvPlayer = null
    }

    return { initFlvPlayer, unInstallFlvPlayerEvent, flvPlayer }
}