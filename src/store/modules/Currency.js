import Currency from "./../../services/Currency";

const state = {
  currencys: [],
};
const getters = {};
const mutations = {
  SET_CURRENCY(state, currencys) {
    state.currencys = currencys.data.data;
  },
};

const actions = {
  storeCurrency({ dispatch }, payload) {
    Currency.storeCurrency(payload).then(() => {
      const notification = {
        type: "success",
        status: true,
        message: "Create currency Successfully",
      };

      dispatch("getCurrencys");

      dispatch("Notification/add", notification, { root: true });
    });
  },
  getCurrencys({ commit }) {
    Currency.getCurrencys().then((currencys) => {
      commit("SET_CURRENCY", currencys);
      console.log(currencys);
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
