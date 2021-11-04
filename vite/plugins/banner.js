import banner from 'vite-plugin-banner'

export default function createBanner() {
    return banner(`
/**
 * 由 trry 提供技术支持
 * https://hooray.gitee.io/trry/
 * Powered by trry
 * https://hooray.github.io/trry/
 */
    `)
}
