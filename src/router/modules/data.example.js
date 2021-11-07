const Layout = () => import('@/layout/index.vue')

export default {
    path: '/multilevel_menu_example',
    component: Layout,
    redirect: '/multilevel_menu_example/page',
    name: 'multilevelMenuExample',
    meta: {
        title: '配置大屏',
        icon: 'sidebar-menu'
    },
    children: [
        {
            path: 'page',
            name: 'multilevelMenuExample1',
            component: () => import('@/views/DataExample/page.vue'),
            meta: {
                title: '测试json->视图'
            }
        },
        {
            path: 'level2',
            name: 'multilevelMenuExample2',
            redirect: '/DataExample/level2/page',
            meta: {
                title: '导航2'
            },
            children: [
                {
                    path: 'page',
                    name: 'multilevelMenuExample2-1',
                    component: () =>
                        import('@/views/DataExample/level2/page.vue'),
                    meta: {
                        title: '导航2-1'
                    }
                }
            ]
        }
    ]
}
