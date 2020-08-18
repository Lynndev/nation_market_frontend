import PaymentMethod from "./../../services/PaymentMethod";

const state = {
  paymentMethods: [],
};
const getters = {};
const mutations = {
  SET_PAYMENT_METHODS(state, paymentMethods) {
    state.paymentMethods = paymentMethods.data.data;
  },
};

const actions = {
  storePaymentMethod({ dispatch }, payload) {
    PaymentMethod.storePaymentMethod(payload).then(() => {
      const notification = {
        type: "success",
        status: true,
        message: "Create payment method Successfully",
      };

      dispatch("getPaymentMethods");

      dispatch("Notification/add", notification, { root: true });
    });
  },
  updatePaymentMethod({ dispatch }, payload) {
    PaymentMethod.updatePaymentMethod(payload).then((response) => {
      console.log(response);
      const notification = {
        type: "success",
        status: true,
        message: "Update payment Successfully",
      };

      dispatch("getPaymentMethods");

      dispatch("Notification/add", notification, { root: true });
    });
  },
  deletePaymentMethod({ dispatch }, payload) {
    PaymentMethod.deletePaymentMethod({ id: payload.id }).then((response) => {
      console.log(response);

      const notification = {
        type: "success",
        status: true,
        message: "delete payment Successfully",
      };
      dispatch("getPaymentMethods");
      dispatch("Notification/add", notification, { root: true });
    });
  },
  getPaymentMethods({ commit }) {
    PaymentMethod.getPaymentMethods().then((paymentMethods) => {
      commit("SET_PAYMENT_METHODS", paymentMethods);
      console.log(paymentMethods);
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
