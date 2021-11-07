import { auth, authAll } from '@/util'

export default function directive(app) {
    // 注册 v-auth 和 v-auth-all 指令
    app.directive('auth', {
        mounted: (el, binding) => {
            if (!auth(binding.value)) {
                el.remove()
            }
        }
    })
    app.directive('auth-all', {
        mounted: (el, binding) => {
            if (!authAll(binding.value)) {
                el.remove()
            }
        }
    })
    /**
     * 监听元素高度变化，更新滚动容器
     */
    app.directive('observe-element-height', {
        insert(el, _) {
            const MutationObserver =
                window.MutationObserver ||
                window.webkitMutationObserver ||
                window.MozMutationObserver
            let recordHeight = 0
            const onHeightChange = _.throttle(function() {
                // _.throttle 节流函数
                let height = window
                    .getComputedStyle(el)
                    .getPropertyValue('height')
                if (height === recordHeight) {
                    return
                }
                recordHeight = height
                console.log('高度变化了')
                // 之后更新外部容器等操作
            }, 500)

            el.__onHeightChange__ = onHeightChange

            el.addEventListener('animationend', onHeightChange)

            el.addEventListener('transitionend', onHeightChange)

            el.__observer__ = new MutationObserver(() => {
                onHeightChange()
            })

            el.__observer__.observe(el, {
                childList: true,
                subtree: true,
                characterData: true,
                attributes: true
            })
        },
        unbind(el) {
            if (el.__observer__) {
                el.__observer__.disconnect()
                el.__observer__ = null
            }
            el.removeEventListener('animationend', el.__onHeightChange__)
            el.removeEventListener('transitionend', el.__onHeightChange__)
            el.__onHeightChange__ = null
        }
    })
}
