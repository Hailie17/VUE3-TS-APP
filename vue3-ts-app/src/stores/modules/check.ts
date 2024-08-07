import http from '@/utils/http'
import type { State } from '../index'
import type { ActionTree, MutationTree, GetterTree } from 'vuex/types/index.js'

interface Infos {
  [index: string]: unknown
}

export interface ChecksState {
  applyList: Infos[],
  checkList: []
}

const state: ChecksState = {
  applyList: [],
  checkList: []
}

const mutations: MutationTree<ChecksState> = {
  updateApply(state,payload) {
    state.applyList = payload
  },
  updateCheck(state,payload) {
    state.checkList = payload
  }
}
const actions: ActionTree<ChecksState, State> = {
  getApply(context, payload) {
    return http.get('/checks/apply',payload)
  },
  postApply(context,payload){
    return http.post('/checks/apply', payload)
  },
  putApply(context,payload) {
    return http.put('/checks/apply',payload)
  }
}
const getters: GetterTree<ChecksState, State> = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
