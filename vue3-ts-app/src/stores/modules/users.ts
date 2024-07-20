import http from '@/utils/http'
import type { State } from '../index'
import type { ActionTree, MutationTree, GetterTree } from 'vuex/types/index.js'

export interface UsersState {
  token: string
}

const state: UsersState = {
  token: ''
}

const mutations: MutationTree<UsersState> = {
  updateToken: (state, payload) => {
    state.token = payload
  }
}
const actions: ActionTree<UsersState, State> = {
  login(context, payload) {
    return http.post('/users/login', payload)
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
