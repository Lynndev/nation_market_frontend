import Server from "./Server";

export default {
  storeShop(payload) {
    const url = "/shops/store";

    return Server.post_data(url, payload);
  },
  getShopByMainCatId(mainCatId) {
    const params = { main_category_id: mainCatId };
    const url = "shops/get?";

    return Server.get_data(url, params);
  },
  getShops() {
    const url = "shops/get";

    return Server.get_data(url);
  },
  getEachShop(payload) {
    const params = { column: Object.keys(payload), value: payload.id };
    const url = `shops/getEach?`;

    return Server.get_data(url, params);
  },
  changeStatus(payload) {
    const url = "/shops/changeStatus";

    return Server.post_data(url, payload);
  },
};
