import http from '@/utils/http'
import type { State } from '../index'
import type { ActionTree, MutationTree, GetterTree } from 'vuex/types/index.js'

interface Infos {
  [index: string]: unknown
}

export interface ChecksState {
  applyList: Infos[]
}

const state: ChecksState = {
  applyList: []
}

const mutations: MutationTree<ChecksState> = {
  updateApply(state,payload) {
    state.applyList = payload
  }
}
const actions: ActionTree<ChecksState, State> = {
  getApply(context, payload) {
    return http.get('/checks/apply',payload)
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
