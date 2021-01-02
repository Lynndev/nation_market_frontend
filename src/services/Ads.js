import Server from "./Server";

export default {
  store(payload) {
    const url = "ads/store";

    return Server.post_data(url, payload);
  },
  get() {
    const url = "ads/get";

    return Server.get_data(url);
  },
  delete(payload) {
    const url = "ads/delete";

    return Server.post_data(url, payload);
  },
};
