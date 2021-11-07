import store from '@/store'
export const isNumber = val => typeof val === 'number'
export const isString = val => typeof val === 'string'

export function deepClone(target) {
    // 定义一个变量
    let result
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
        // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = [] // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]))
            }
            // 判断如果当前的值是null的话；直接赋值为null
        } else if (target === null) {
            result = null
            // 判断如果当前的值是一个RegExp对象的话，直接赋值
        } else if (target.constructor === RegExp) {
            result = target
        } else {
            // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {}
            for (let i in target) {
                result[i] = deepClone(target[i])
            }
        }
        // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target
    }
    // 返回最终结果
    return result
}

function hasPermission(permission) {
    if (store.state.settings.enablePermission) {
        return store.state.user.permissions.some(v => {
            return v === permission
        })
    } else {
        return true
    }
}

export function auth(value) {
    let auth
    if (typeof value === 'string') {
        auth = hasPermission(value)
    } else {
        auth = value.some(item => {
            return hasPermission(item)
        })
    }
    return auth
}

export function authAll(value) {
    const auth = value.every(item => {
        return hasPermission(item)
    })
    return auth
}

/**
 * 补充单位
 * @param {String|Number} value
 * @returns string
 */
export function addUnit(value) {
    if (isString(value)) {
        return value
    } else if (isNumber(value)) {
        return `${value}px`
    }
    return ''
}

/**
 * 判断字符串有没有单位
 * 调用时机：渲染页面
 * @params {String|Number} val
 * @returns string
 */
export function isUnit(val) {
    if (isNumber(val)) {
        return val + 'px'
    } else if (isString(val)) {
        if (
            val.indexOf('px') ||
            val.indexOf('vh') ||
            val.indexOf('vw') ||
            val.indexOf('%')
        ) {
            return val
        } else {
            return isUnit(Number(val))
        }
    }
}

/**
 * 事件作用
 * 调用时机：收/发消息事件触发时 回顶
 * @param {string|number} val
 * @returns number
 */
export function unUnit(val) {
    if (isNumber(val)) {
        return val
    } else if (isString(val)) {
        if (val.search('px') !== -1)  return Number(val.replace('px', ''))
        if (val.search('vh') !== -1)  return Number(val.replace('vh', ''))
        if (val.search('vh') !== -1)  return Number(val.replace('vh', ''))
        if (val.search('%') !== -1)  return Number(val.replace('%', ''))
        unUnit(Number(val))
    }
}
