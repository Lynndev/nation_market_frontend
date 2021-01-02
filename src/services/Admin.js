import Server from "./Server";

export default {
  store(payload) {
    const url = "admin/store";

    return Server.post_data(url, payload);
  },
  update(payload) {
    const url = "admin/update";
    return Server.post_data(url, payload);
  },
  get() {
    const url = "admin/getAll";

    return Server.get_data(url);
  },
  delete(payload) {
    const url = "admin/delete";

    return Server.post_data(url, payload);
  },
  getEach(params) {
    const url = "admin/getEach?";
    return Server.get_data(url, params);
  },
};
