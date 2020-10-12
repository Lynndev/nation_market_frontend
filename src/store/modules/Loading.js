const state = {
  loading: false,
  action_loading: false,
  pre_loading:false
};
const getters = {};

const mutations = {
  CHANGE_LOADING(state) {
    state.loading = !state.loading;
  },
  CHANGE_ACTION_LOADING(state) {
    state.action_loading = !state.action_loading;
  },
  CHANGE_PRE_LOADING(state) {
    state.pre_loading = !state.pre_loading;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
