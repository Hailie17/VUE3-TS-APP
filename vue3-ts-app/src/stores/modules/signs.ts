import type { State } from '../index'
import type { ActionTree, MutationTree, GetterTree } from 'vuex/types/index.js'

export interface SignsState {}

const state: SignsState = {}

const mutations: MutationTree<SignsState> = {}
const actions: ActionTree<SignsState, State> = {}
const getters: GetterTree<SignsState, State> = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
