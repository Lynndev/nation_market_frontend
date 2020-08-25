const getDefaultState = () => {
  return {
    items: [],
    status: "empty",
  };
};
// initial state
const state = getDefaultState();
const getters = {};

const mutations = {
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

const actions = {
  resetCartState({ commit }) {
    commit("resetState");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
