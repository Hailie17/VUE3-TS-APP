import type { State } from '../index'
import type { ActionTree, MutationTree, GetterTree } from 'vuex/types/index.js'

export interface UsersState {}

const state: UsersState = {}

const mutations: MutationTree<UsersState> = {}
const actions: ActionTree<UsersState, State> = {}
const getters: GetterTree<UsersState, State> = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
