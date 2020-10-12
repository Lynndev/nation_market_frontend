import Server from "./Server";

export default {
  store(payload) {
    const url = "message_note/store";

    return Server.post_data(url, payload);
  },
  get() {
    const url = "message_note/get";

    return Server.get_data(url);
  },
  delete(payload) {
    const url = "message_note/delete";

    return Server.post_data(url, payload);
  },
};
