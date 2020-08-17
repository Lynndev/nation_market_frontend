import User from "./../../services/User";
import router from "./../../router/index";

const state = {
  isLoggedIn: false,
  loginInfoError: false,
  adminData: {},
};
const getters = {};
const mutations = {
  LOGIN_INFO_ERROR(state) {
    state.loginInfoError = true;
  },
  REMOVE_LOGIN_INFO_ERROR(state) {
    state.loginInfoError = false;
  },
  SET_ADMIN_DATA(state, adminData) {
    state.adminData = adminData.data.data.admin;
  },
  CHANGE_LOGGED_IN_STATUS(state) {
    state.isLoggedIn = !state.isLoggedIn;
  },
};

const actions = {
  login({ commit, dispatch }, payload) {
    User.login(payload).then((user) => {
      if (user.data.success == false) {
        commit("LOGIN_INFO_ERROR");

        router.push("/login", () => {});
      } else {
        const notification = {
          type: "success",
          status: true,
          message: "Login Successfully",
        };

        commit("CHANGE_LOGGED_IN_STATUS");
        commit("REMOVE_LOGIN_INFO_ERROR");

        dispatch("Notification/add", notification, { root: true });

        dispatch("getAdminData");

        router.push("/", () => {});
      }
    });
  },
  logout({ commit }) {
    User.logout().then(() => {
      localStorage.clear();

      commit("CHANGE_LOGGED_IN_STATUS");

      commit("REMOVE_LOGIN_INFO_ERROR");

      router.push("/login", () => {});
    });
  },
  getAdminData({ commit }) {
    User.getadminData().then((adminData) => {
      console.log(adminData);
      commit("SET_ADMIN_DATA", adminData);
    });
  },
  changePassword({ dispatch }, payload) {
    User.changePassword(payload).then((response) => {
      const notification = {
        type: "success",
        status: true,
        message: "Password change Successfully",
      };
      console.log(response);
      dispatch("Notification/add", notification, { root: true });
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
