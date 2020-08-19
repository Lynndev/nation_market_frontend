import Server from "./Server";

export default {
  storeCurrency(payload) {
    const url = "currency/store";

    return Server.post_data(url, payload);
  },
  getCurrencys() {
    const url = "currency/get";

    return Server.get_data(url);
  },
};
