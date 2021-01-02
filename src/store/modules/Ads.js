import Ads from "./../../services/Ads";

const state = {
  ads: [],
};
const getters = {};
const mutations = {
  SET_ADS(state, payload) {
    state.ads = payload;
  },
  APPEND_ADS(state, payload) {
    state.ads.push(payload);
  },
  REMOVE_ADS(state, payload) {
    state.ads = state.ads.filter((val) => {
      return val.id != payload;
    });
  },
};

const actions = {
  create({ dispatch, commit }, payload) {
    Ads.store(payload).then((response) => {
      const notification = {
        type: "success",
        status: true,
        message: "Create ADS Successfully",
      };
      commit("APPEND_ADS", response.data.data);
      dispatch("Notification/add", notification, { root: true });
    });
  },
  get({ commit }) {
    Ads.get().then((response) => {
      console.log(response.data.data);
      commit("SET_ADS", response.data.data);
    });
  },
  delete({ commit, dispatch }, payload) {
    Ads.delete({ id: payload }).then(() => {
      const notification = {
        type: "success",
        status: true,
        message: "Delete ADS Successfully",
      };
      dispatch("Notification/add", notification, { root: true });
      commit("REMOVE_ADS", payload);
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
