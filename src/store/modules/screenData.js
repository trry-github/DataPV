/**
 * 存放全局公用状态
 */
const state = () => ({
    activeEle: {},
    mode: ''
})

const getters = {}

const actions = {}

const mutations = {
    setActiveEle(state, data) {
        state.activeEle = data
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
