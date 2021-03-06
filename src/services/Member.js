import Server from "./Server";

export default {
  storeMember(payload) {
    const url = "member/store";

    return Server.post_data(url, payload);
  },
  updateMember(payload) {
    let memberId = payload.get("id");
    const params = { id: memberId };

    const url = "member/update?";

    return Server.post_data(url, payload, params);
  },
  blockMember(memberId) {
    const params = { id: memberId };

    const url = "member/block?";

    const payload = null;
    return Server.post_data(url, payload, params);
  },
  unblockMember(memberId) {
    const params = { id: memberId };

    const url = "member/unblock?";

    const payload = null;
    return Server.post_data(url, payload, params);
  },
  getBlockMembers() {
    const url = "member/block";

    return Server.get_data(url);
  },
  getMembers() {
    const url = "member/get";

    return Server.get_data(url);
  },
  getMarkMember(){
    const url = "member/get?blue_mark=1";

    return Server.get_data(url);
  },
  getChatMembers() {
    const url = "chat/getMember";

    return Server.get_data(url);
  },
  sendMessageFromAdmin(payload) {
    const url = "chat";

    return Server.post_data(url, payload);
  },
  getMemberMessages(id) {
    const url = "chat/get?";
    let params = { member_id: id };

    return Server.get_data(url, params);
  },
  toogleMark(payload) {
    const url = "member/addTreasureMark";

    return Server.post_data(url, payload);
  },
};
