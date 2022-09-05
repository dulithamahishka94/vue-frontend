import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
    state: {
        name: '',
        token: '',
        isAdmin: false,
        loggedIn: false
    },
    mutations: {
        UPDATE_API_TOKEN(state, payload) {
            state.token = payload
        },
        SET_LOGGED_IN(state, payload) {
            state.loggedIn = payload
        },
        SET_ADMIN(state, payload) {
            state.isAdmin = payload
        },
        SET_NAME(state, payload) {
            state.name = payload
        }
    },
    actions: {
        addToken(context, payload) {
            context.commit('UPDATE_API_TOKEN', payload)
        },
        setLoggedIn(context, payload) {
            context.commit('SET_LOGGED_IN', payload)
        },
        setAdmin(context, payload) {
            context.commit('SET_LOGGED_IN', payload)
        },
        setName(context, payload) {
            context.commit('SET_NAME', payload)
        }
    },
    getters: {

    },
    plugins: [
        createPersistedState({
            storage: window.localStorage,
        }),
    ],
})