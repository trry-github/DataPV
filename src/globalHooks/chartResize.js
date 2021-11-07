// export default {
//     name: 'ChartResize',
//     data() {
//         return {
//             _ChartResizeTimmer: null, // 定时器
//             _ChartResizeWindowWidth: '', // 屏幕宽度
//             wait: 100
//         }
//     },
//     mounted() {
//         this._ChartResizeWindowWidth = window.innerWidth
//         window.addEventListener('resize', this._ChartResizeOnResize)
//     },
//     methods: {
//         _ChartResizeOnResize(event) {
//             if (this._ChartResizeTimmer) clearTimeout(this._ChartResizeTimmer)
//             this._ChartResizeTimmer = setTimeout(() => {
//                 if (event.target.innerWidth !== this._ChartResizeWindowWidth) {
//                     this.chartResize()
//                     // 同步当前窗口宽度
//                     this._ChartResizeWindowWidth = event.target.innerWidth
//                 }
//             }, this.wait)
//         }
//     },
//     beforeDestroy() {
//         window.removeEventListener('resize', this._ChartResizeOnResize)
//     }
// };
export function chartResize(ele) {
    var MutationObserver =
        window.MutationObserver ||
        window.webkitMutationObserver ||
        window.MozMutationObserver

    var recordHeight = 0
    var mutationObserver = new MutationObserver(function(mutations) {
        console.log(mutations)

        let height = window.getComputedStyle(ele).getPropertyValue('height')
        if (height === recordHeight) {
            return
        }
        recordHeight = height
        console.log('高度变化了')
        // 之后更新外部容器等操作
    })

    mutationObserver.observe(ele, {
        childList: true, // 子节点的变动（新增、删除或者更改）
        attributes: true, // 属性的变动
        characterData: true, // 节点内容或节点文本的变动
        subtree: true // 是否将观察器应用于该节点的所有后代节点
    })
}
