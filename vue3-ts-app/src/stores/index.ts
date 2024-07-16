import { createStore, useStore as baseUseStore } from 'vuex'
import type { Store } from 'vuex'
import users from './modules/users'
import type { UsersState } from './modules/users'
import type { InjectionKey } from 'vue'

export interface State {}

export interface StateAll extends State {
  users: UsersState
}

export const key: InjectionKey<Store<StateAll>> = Symbol()

export function useStore() {
  return baseUseStore(key)
}

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    users
  }
})
