import Hls from 'hls.js'
window.Hls = Hls

export default function useHlsPlayer({ dp, timer, filterUrl, defaultOptions, loadError, emit }) {
    let hls = null,
        oldCurrentTime = 0

    /**
     * 初始化 hls 播放器
     */
    function initHls(options = defaultOptions, fun) {
        options.video.type = 'hls'
        options.video.url = filterUrl('.m3u8')
        options.pluginOptions.hls = {
            debug: false,
            levelLoadingMaxRetry: 1000000,
            levelLoadingMaxRetryTimeout: 2000,
            nudgeMaxRetry: 0
        }
        fun()
        hls = dp.value.plugins.hls
        registerHlsEvent()
    }
    /**
     * 注册 hls 播放器事件
     */
    function registerHlsEvent() {
        // 监听拉流状态
        hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
                switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        clearInterval(timer)
                        timer = null
                        timer = setTimeout(() => {
                            hls.loadSource(filterUrl('.m3u8'))
                        }, 2000)
                        break
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        hls.recoverMediaError()
                        break
                }
            } else {
                const currentTime = parseInt(dp.value.video.currentTime)
                if (!dp.value.video.paused) {
                    if (currentTime === oldCurrentTime) {
                        console.count('直播没有暂停，且上次错误时间等于这次错误播放的时间')
                        loadError.value = true
                        hls.detachMedia()
                        hls.loadSource(filterUrl('.m3u8'))
                        hls.attachMedia(dp.value.video)
                        emit('error')
                    } else {
                        loadError.value = false
                    }
                }
                oldCurrentTime = currentTime
            }
        })
    }
    /**
     * 卸载 hls 播放器
     */
    function unInstallHlsEvent() {
        hls.destroy()
    }

    return {
        unInstallHlsEvent,
        initHls
    }
}