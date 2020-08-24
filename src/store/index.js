import Vue from 'vue'
import Vuex from 'vuex'

import cart from './modules/cart';
import getters from './getters';

Vue.use(Vuex)

//创建vuex实例
const store = new Vuex.Store({
  modules: {
    cart
  },
  getters
})

export default store   //导出store
