const Layout = () => import('@/layout/index.vue')

export default {
    path: '/video-demo',
    component: Layout,
    redirect: '/video-demo/page',
    name: 'VideoDemo',
    meta: {
        title: '测试播放器',
        icon: 'sidebar-menu'
    },
    children: [
        {
            path: 'page',
            name: 'VideoDemoExample',
            component: () =>
                import('@/views/video_demo/page.vue'),
            meta: {
                title: '导航2'
            }
        },
        {
            path: 'pages',
            name: 'multilevelMenuExample2',
            redirect: '/video-demo/page1',
            meta: {
                title: '导航2'
            },
            children: [
                {
                    path: 'page1',
                    name: 'multilevelMenuExample2-1',
                    component: () =>
                        import('@/views/video_demo/level2/page1.vue'),
                    meta: {
                        title: '导航2-1'
                    }
                }, {
                    path: 'page2',
                    name: 'multilevelMenuExample2-2',
                    component: () =>
                        import('@/views/video_demo/level2/page2.vue'),
                    meta: {
                        title: '导航2-1'
                    }
                }
            ]
        }
    ]
}
