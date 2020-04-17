export const state = () => ({
  user: null
})

export const mutations = {
  // data from Cognito are primary
  setUser(state, user) {
    state.user = user
  },

  // data from database are part of user object as user.data
  setUserData(state, userData) {
    state.user.data = userData
  },

  // set user speaker
  setUserSpeaker(state, userSpeaker) {
    state.user.data.speaker = userSpeaker
  }
}

export const actions = {
  editUserSpeaker({ commit }, userSpeaker) {
    commit('setUserSpeaker', userSpeaker)
  }
}
