import Vue from 'vue'
import Router from 'vue-router'
import MatrixMgr from '@/components/5.matrixMgr/MatrixMgr'
import Preview from '@/components/6.preview/Preview'

Vue.use(Router);

export default new Router({
    mode: 'hash',
    linkActiveClass: 'active',
    routes: [{
        path: '/matrixMgr',
        name: 'matrixMgr',
        component: MatrixMgr,
    }, {
        path: '/preview',
        name: 'preview',
        component: Preview,
    }]
})

