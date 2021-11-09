export function useChartResize(ele, resize) {
    let MutationObserver =
        window.MutationObserver ||
        window.webkitMutationObserver ||
        window.MozMutationObserver

    // let recordHeight = 0
    let recordWidth = 0

    console.log(MutationObserver)

    let mutationObserver = new MutationObserver(function(mutations) {
        // let height = window.getComputedStyle(ele).getPropertyValue('height')
        // if (height === recordHeight) {
        //     return
        // }
        // recordHeight = height
        // console.log('高度变化了')
        console.log(mutations)
        let width = window.getComputedStyle(ele).getPropertyValue('width')
        recordWidth = width
        if (width === recordWidth) return
        resize && resize()
        // 之后更新外部容器等操作
    })

    mutationObserver.observe(ele, {
        childList: false, // 子节点的变动（新增、删除或者更改）
        attributes: true, // 属性的变动
        characterData: true, // 节点内容或节点文本的变动
        subtree: false // 是否将观察器应用于该节点的所有后代节点
    })
}
