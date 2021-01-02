import Admin from "../../services/Admin";

const state = {
  admins: [],
  admin: {},
};
const getters = {};
const mutations = {
  SET_ADMIN(state, payload) {
    state.admins = payload;
  },
  APPEND_ADMIN(state, payload) {
    state.admins.push(payload);
  },
  REMOVE_ADMIN(state, payload) {
    state.admins = state.admins.filter((val) => {
      return val.id != payload;
    });
  },
  SET_EACH_ADMIN(state, payload) {
    state.admin = payload;
  },
};

const actions = {
  create({ dispatch, commit }, payload) {
    Admin.store(payload).then((response) => {
      const notification = {
        type: "success",
        status: true,
        message: "Create admin Successfully",
      };
      commit("APPEND_ADMIN", response.data.data);
      dispatch("Notification/add", notification, { root: true });
    });
  },

  update({ dispatch }, payload) {
    Admin.update(payload).then(() => {
      const notification = {
        type: "success",
        status: true,
        message: "Update admin Successfully",
      };

      dispatch("Notification/add", notification, { root: true });
    });
  },

  get({ commit }) {
    Admin.get().then((response) => {
      console.log(response.data.data);
      commit("SET_ADMIN", response.data.data);
    });
  },
  getEach({ commit }, payload) {
    Admin.getEach(payload).then((response) => {
      console.log(response.data.data);
      commit("SET_EACH_ADMIN", response.data.data);
    });
  },
  delete({ commit, dispatch }, payload) {
    Admin.delete({ id: payload }).then(() => {
      const notification = {
        type: "success",
        status: true,
        message: "Delete admin Successfully",
      };
      dispatch("Notification/add", notification, { root: true });
      commit("REMOVE_ADMIN", payload);
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
