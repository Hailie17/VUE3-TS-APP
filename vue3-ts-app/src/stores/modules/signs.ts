import http from '@/utils/http'
import type { State } from '../index'
import type { ActionTree, MutationTree, GetterTree } from 'vuex/types/index.js'

interface Infos {
  [index: string]: unknown
}

export interface SignsState {
  infos: Infos
}

const state: SignsState = {
  infos: {}
}

const mutations: MutationTree<SignsState> = {
  updateInfos: (state, payload) => {
    state.infos = payload
  }
}
const actions: ActionTree<SignsState, State> = {
  getTime: (context, payload) => {
    return http.get('/signs/time', payload)
  }
}
const getters: GetterTree<SignsState, State> = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
