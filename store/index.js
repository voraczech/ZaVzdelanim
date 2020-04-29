export const state = () => ({
  user: {},

  // isSet variables are better to recognize whether state should by empty, or not

  userActivities: {
    isSet: false,
    attendence: {},
    speaker: {},
    creator: {},
    admin: {},
    followOrganization: {},
    followSpeaker: {}
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
  // data from Cognito are default user credentials
  setUser(state, user) {
    state.user = user
  },

  setUserActivities(state, data) {
    state.userActivities = { isSet: true, ...data }
  },

  setUserActivity(state, data) {
    state.userActivities = { ...state.userActivities, ...data }
  },

  setEvents(state, data) {
    state.events = { isSet: true, ...data }
  },

  setSpeakers(state, data) {
    state.speakers = { isSet: true, ...data }
  },

  setOrganizations(state, data) {
    state.organizations = { isSet: true, ...data }
  },

  setAttendence(state, data) {
    state.userActivities.attendence.items = data
  }
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
  },

  sortAttendence({ commit, state }) {
    function compare(a, b) {
      // Use toUpperCase() to ignore character casing
      const eventA = a.event.date;
      const eventB = b.event.date;

      let comparison = 0;
      if (eventA > eventB) {
        comparison = 1;
      } else if (eventA < eventB) {
        comparison = -1;
      }
      return comparison;
    }

    const date = new Date().toISOString();

    const result = [...state.userActivities.attendence.items].filter(event => event.event.date > date).sort(compare)

    commit('setAttendence', result)
  }
}
