// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from '@/walle/component/http'
import dom from '@/walle/component/dom'

Vue.config.productionTip = false;

const debug = false;
router.beforeEach((to, from, next)=>{
  //#region debug
  if(debug){
    next();
  }
  //#endregion
  //#region product
  else{
    if (to.meta.requireAuth) {
      Vue.http.post('/isLogin',{}).then((res)=>{
        if(!res.data.ok){
          next({
            path: '/login',
            query: {redirect: to.fullPath}
          });
        }
        else{
          next();
        }});
    }
    else {
      next();
    }
  }
  //#endregion
});

new Vue({
  el: '#app',
  router,
  http,
  dom,
  template: '<App/>',
  components: { App }
});
