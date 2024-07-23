import http from '@/utils/http'
import type { State } from '../index'
import type { ActionTree, MutationTree, GetterTree } from 'vuex/types/index.js'

interface Infos {
  [index: string]: unknown
}
export interface UsersState {
  token: string
  infos: Infos
}

const state: UsersState = {
  token: '',
  infos: {}
}

const mutations: MutationTree<UsersState> = {
  updateToken: (state, payload) => {
    state.token = payload
  },
  updateInfos: (state, payload) => {
    state.infos = payload
  },
  clearToken: (state) => {
    state.token = ''
  }
}
const actions: ActionTree<UsersState, State> = {
  login(context, payload) {
    return http.post('/users/login', payload)
  },
  infos() {
    return http.get('/users/infos')
  }
}
const getters: GetterTree<UsersState, State> = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
