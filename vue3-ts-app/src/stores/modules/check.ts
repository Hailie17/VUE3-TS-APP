import type { State } from '../index'
import type { ActionTree, MutationTree, GetterTree } from 'vuex/types/index.js'

export interface ChecksState {}

const state: ChecksState = {}

const mutations: MutationTree<ChecksState> = {}
const actions: ActionTree<ChecksState, State> = {}
const getters: GetterTree<ChecksState, State> = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
