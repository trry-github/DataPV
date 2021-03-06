import api from '@/api'
import { auth, authAll } from '@/util'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import Cookies from 'js-cookie'
import hotkeys from 'hotkeys-js'
import mitt from 'mitt'
import { nanoid } from 'nanoid'
import _ from 'lodash'
import * as echarts from 'echarts'
import 'echarts/theme/shine.js'

const eventBus = mitt()

export default function globalProperties(app) {
    // 请求
    app.config.globalProperties.$api = api
    // 鉴权
    app.config.globalProperties.$auth = auth
    app.config.globalProperties.$authAll = authAll
    dayjs.locale('zh-cn')
    app.config.globalProperties.$dayjs = dayjs
    app.config.globalProperties.$cookies = Cookies
    app.config.globalProperties.$hotkeys = hotkeys
    app.config.globalProperties.$eventBus = mitt()
    app.config.globalProperties.$lodash = _
}
export const globalVariable = {
    $api: api,
    $auth: auth,
    $authAll: authAll,
    $dayjs: dayjs,
    $cookies: Cookies,
    $hotkeys: hotkeys,
    $eventBus: eventBus,
    $echarts: echarts,
    $lodash: _,
    $nanoid: nanoid
}
