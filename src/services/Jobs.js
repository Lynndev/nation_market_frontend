import Server from "./Server";
export default {
  store(payload) {
    const url = "/job/store";
    return Server.post_data(url, payload);
  },
  update(payload) {
    const url = "/job/update";
    return Server.post_data(url, payload);
  },
  deleteData(payload) {
    const url = "/job/delete";
    return Server.post_data(url, payload);
  },
  getAll() {
    const url = "/job/get";
    return Server.get_data(url);
  },
  getEach(params) {
    const url = "/job/getEach?";
    return Server.get_data(url, params);
  },
};
