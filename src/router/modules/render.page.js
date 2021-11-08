const Layout = () => import('@/layout/index.vue')

export default {
    path: '/render',
    component: Layout,
    redirect: '/render/page',
    name: 'Render',
    meta: {
        title: '配置大屏',
        icon: 'sidebar-menu'
    },
    children: [
        {
            path: 'page',
            name: 'RenderPage',
            component: () => import('@/views/renderPage/index.vue'),
            meta: {
                title: '测试json->视图'
            }
        }
    ]
}
