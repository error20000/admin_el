import Vue from 'vue'
import i18n from './locales';
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css';
import './assets/css/public.css';
import global from './global';
import './enum'

Vue.use(ElementUI, { 
	size: 'mini',
	i18n: (key, value) => i18n.t(key, value)
});
Vue.use(global);

Vue.config.productionTip = false;

//自定义指令--权限验证
Vue.directive('hasAuth', {
	inserted: function (el, binding, vnode) {
		let auth = binding.value;
		if(!auth){
			return; //如果按钮权限标识符为空，不进行按钮权限判断。
		}
		//缓存
		if(!window.e.btnCache){
			window.e.btnCache = {};
		}
		if(typeof window.e.btnCache[auth] !== 'undefined' && !window.e.btnCache[auth]){
			el.parentNode.removeChild(el);
			return; //如果有缓存走缓存。
		}
		//从本地存储获取菜单按钮权限
		let dataStr = localStorage.getItem(window.e.userAuth);
		if(!dataStr){
			return; //如果没有权限信息，不进行按钮权限判断。
		}
		let btns = JSON.parse(dataStr).btns;
		if(!btns){
			return; //如果没有权限信息，不进行按钮权限判断。
		}
		let flag = false;
		// console.log(auth);
		// console.log(btns);
		for (var i = 0; i < btns.length; i++) {
			if(btns[i].symbol == auth){
			  flag = true;
			  break;
			}
		}
    	if(!flag){
      		el.parentNode.removeChild(el);
    	}
		window.e.btnCache[auth] = flag; //写缓存
	}
});


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
