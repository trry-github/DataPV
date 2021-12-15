const Layout = () =>
    import('@/layout/index.vue')

export default {
    path: '/demo',
    component: Layout,
    redirect: '/demo/test',
    name: 'Render',
    meta: {
        title: 'demo',
        icon: 'sidebar-menu'
    },
    children: [{
        path: 'test',
        name: 'DemoTest',
        component: () =>
            import('@/views/demo/test.vue'),
        meta: {
            title: 'demo-test'
        }
    }]
}
