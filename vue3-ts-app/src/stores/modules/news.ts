import type { State } from '../index'
import type { ActionTree, MutationTree, GetterTree } from 'vuex/types/index.js'

export interface NewsState {}

const state: NewsState = {}

const mutations: MutationTree<NewsState> = {}
const actions: ActionTree<NewsState, State> = {}
const getters: GetterTree<NewsState, State> = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
