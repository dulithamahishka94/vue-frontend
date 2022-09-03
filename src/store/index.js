import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
    state: {
        firstName: 'John',
        lastName: 'Doe',
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
    },
    actions: {
        addToken(context, payload) {
            context.commit('UPDATE_API_TOKEN', payload)
            // localStorage.app_token = AES.encrypt(JSON.stringify(payload), process.env.VUE_APP_SALT); 
        },
        setLoggedIn(context, payload) {
            context.commit('SET_LOGGED_IN', payload)
            // const envryptedObject = this.$CryptoJS.AES.encrypt('true', process.env.VUE_APP_SALT).toString()
            // localStorage.setItem("loggedIn", envryptedObject)
            // localStorage.app_token = envryptedObject.toString();
        },
        setAdmin(context, payload) {
            context.commit('SET_LOGGED_IN', payload)
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