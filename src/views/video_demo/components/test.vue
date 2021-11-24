<template>
    <video ref="myVideo" class="video" controls="controls" :src="videoUrl" />
</template>
 
<script>
export default {
    name: 'Video',
    data() {
        return {
            videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4'
        }
    },
    mounted() {
        const myVideo = this.$refs.myVideo
        this.$nextTick(() => {
            myVideo.addEventListener('play', this._bindHandlerFull)
            myVideo.addEventListener('ended', this._unbindHandlerFull)
        })
    },
    methods: {
        // bind
        _bindHandlerFull() {
            const myVideo = this.$refs.myVideo
            console.log('开始播放')
            this.launchFullscreen(myVideo)
        },

        // unbind
        _unbindHandlerFull() {
            console.log('播放结束')
            // 檢查瀏覽器是否處於全屏
            if (this.invokeFieldOrMethod(document, 'FullScreen') || this.invokeFieldOrMethod(document, 'IsFullScreen') || document.IsFullScreen) {
                this.exitFullscreen()
            }
        },

        // 反射调用
        invokeFieldOrMethod(element, method) {
            var usablePrefixMethod
            ;['webkit', 'moz', 'ms', 'o', ''].forEach(function(prefix) {
                if (usablePrefixMethod) return
                if (prefix === '') {
                    // 无前缀，方法首字母小写
                    method = method.slice(0, 1).toLowerCase() + method.slice(1)
                }
                var typePrefixMethod = typeof element[prefix + method]
                if (typePrefixMethod + '' !== 'undefined') {
                    if (typePrefixMethod === 'function') {
                        usablePrefixMethod = element[prefix + method]()
                    } else {
                        usablePrefixMethod = element[prefix + method]
                    }
                }
            })

            return usablePrefixMethod
        },

        // 进入全屏
        launchFullscreen(element) {
            // 此方法不可以在異步任務中執行，否則火狐無法全屏
            if (element.requestFullscreen) {
                element.requestFullscreen()
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen()
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen()
            } else if (element.oRequestFullscreen) {
                element.oRequestFullscreen()
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullScreen()
            } else {
                var docHtml = document.documentElement
                var docBody = document.body
                var videobox = document.getElementById('videobox')
                var cssText = 'width:100%;height:100%;overflow:hidden;'
                docHtml.style.cssText = cssText
                docBody.style.cssText = cssText
                videobox.style.cssText = cssText + ';' + 'margin:0px;padding:0px;'
                document.IsFullScreen = true
            }
        },

        // 退出全屏
        exitFullscreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.oRequestFullscreen) {
                document.oCancelFullScreen()
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen()
            } else {
                var docHtml = document.documentElement
                var docBody = document.body
                var videobox = document.getElementById('videobox')
                docHtml.style.cssText = ''
                docBody.style.cssText = ''
                videobox.style.cssText = ''
                document.IsFullScreen = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.video {
    width: 100%;
}
</style>