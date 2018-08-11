import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
// import { apiActions } from '../api'

Vue.use(Vuex)

const state = {
	userAgent: '',
	modules: {}, // 已经加载的所以组件
}

export default new Vuex.Store({
	state,
	actions,
	getters,
	mutations,
})