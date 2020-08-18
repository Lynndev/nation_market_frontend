import Server from "./Server";

export default {
  storePaymentMethod(payload) {
    const url = "payment_method/store";

    return Server.post_data(url, payload);
  },
  updatePaymentMethod(payload) {
    const url = "payment_method/update";

    return Server.post_data(url, payload);
  },
  deletePaymentMethod(id) {
    const url = "payment_method/delete";

    return Server.post_data(url, id);
  },
  getPaymentMethods() {
    const url = "payment_method/get";

    return Server.get_data(url);
  },
};
