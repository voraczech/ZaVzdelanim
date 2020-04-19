export const state = () => ({
  user: {},

  // isSet variables are better to recognize whether state should by empty, or not

  userActivities: {
    isSet: false,
    attendence: {},
    speaker: {},
    creator: {},
    admin: {}
  },
  events: {
    isSet: false,
  },
  speakers: {
    isSet: false,
  },
  organizations: {
    isSet: false,

  }
})

export const mutations = {
  // data from Cognito are primary
  setUser(state, user) {
    state.user = user
  },

  setUserActivities(state, data) {
    state.userActivities = { isSet: true, ...data }
  },

  setUserActivity(state, data) {
    state.userActivities = { ...state.userActivities, ...data }
  },
}

export const actions = {
  deleteUserActivities({ commit }) {
    commit('setUserData', { isSet: false })
  },

  deleteUser({ commit, dispatch }) {
    dispatch('deleteUserData')
    commit('setUser', {})
  },

  setUser({ commit }, user) {
    commit('setUser', user)
  },

  setUserActivities({ commit }, data) {
    commit('setUserActivities', data)
  },

  setUserActivity({ commit }, data) {
    commit('setUserActivity', data)
  }
}
