import Jobs from "./../../services/Jobs";
const state = {
  data: [],
  eachData: {},
};
const getters = {};
const mutations = {
  SET_DATA(state, data) {
    state.data = data.data.data;
  },
  SET_EACH(state, data) {
    state.eachData = data.data.data;
  },
};
const actions = {
  store({ dispatch }, payload) {
    Jobs.store(payload).then(() => {
      const notification = {
        type: "success",
        status: true,
        message: "job create Successfully",
      };
      dispatch("Notification/add", notification, { root: true });
      window.location.reload();
    });
  },
  update({ dispatch }, payload) {
    Jobs.update(payload).then(() => {
      const notification = {
        type: "success",
        status: true,
        message: "job update Successfully",
      };
      dispatch("Notification/add", notification, { root: true });
    });
  },
  deleteData({ dispatch }, payload) {
    Jobs.deleteData(payload).then(() => {
      const notification = {
        type: "success",
        status: true,
        message: "job delete Successfully",
      };
      dispatch("Notification/add", notification, { root: true });
    });
  },
  getAll({ commit }) {
    Jobs.getAll().then((data) => {
      commit("SET_DATA", data);
    });
  },
  getEach({ commit }, id) {
    Jobs.getEach({ column: "id", value: id }).then((data) => {
      commit("SET_EACH", data);
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
