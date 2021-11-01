import banner from 'vite-plugin-banner'

export default function createBanner() {
    return banner(`
/**
 * 由 Bliangjs 提供技术支持
 * https://hooray.gitee.io/Bliangjs/
 * Powered by Bliangjs
 * https://hooray.github.io/Bliangjs/
 */
    `)
}
