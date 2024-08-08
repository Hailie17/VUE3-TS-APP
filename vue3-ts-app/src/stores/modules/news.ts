import type { State } from '../index'
import type { ActionTree, MutationTree, GetterTree } from 'vuex/types/index.js'
import http from "@/utils/http";

interface Info {
  [index: string] : unknown
}

export interface NewsState {
  info: Info
}

const state: NewsState = {
  info: {}
}

const mutations: MutationTree<NewsState> = {
  updateInfo(state,payload) {
    state.info = payload
  }
}
const actions: ActionTree<NewsState, State> = {
  getInfo(context,payload) {
    return http.get('news/remind', payload)
  }
}
const getters: GetterTree<NewsState, State> = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
