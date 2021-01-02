import Member from "./../../services/Member";
import router from "./../../router/index";

const state = {
  members: [],
  blockMembers: [],
  messages: [],
  chatMembers: [],
};
const getters = {};
const mutations = {
  SET_MEMBERS(state, members) {
    state.members = members.data.data;
  },
  SET_CHAT_MEMBERS(state, members) {
    state.chatMembers = members.data.data;
  },
  SET_MESSAMGES(state, messages) {
    state.messages = messages.data.data;
    console.log(state.messages);
  },
  SET__BLOCK_MEMBERS(state, blockMembers) {
    state.blockMembers = blockMembers.data.data;
  },
  APPEND_MESSAMGES(state, message) {
    state.messages.push(message);
  },
  MANAGE_MEMBER(state, member) {
    state.members = state.members.filter((val) => {
      return val.id != member.id;
    });
    state.members.unshift(member);
  },
  TOOGLE_MARK(state, payload) {
    state.members = state.members.map((val) => {
      if (val.id == payload) {
        val.blue_mark = !val.blue_mark;
      }
    });
  },
};

const actions = {
  storeMember({ dispatch }, payload) {
    Member.storeMember(payload).then((response) => {
      console.log(response);
      const notification = {
        type: "success",
        status: true,
        message: "Member store Successfully",
      };

      dispatch("Notification/add", notification, { root: true });

      dispatch("getMembers");

      router.push("/member/", () => {});
    });
  },
  updateMember({ dispatch }, payload) {
    Member.updateMember(payload).then((response) => {
      console.log(response);
      const notification = {
        type: "success",
        status: true,
        message: "Update Member Successfully",
      };

      dispatch("Notification/add", notification, { root: true });

      dispatch("getMembers");

      router.push("/member/", () => {});
    });
  },
  blockMember({ dispatch }, memberId) {
    Member.blockMember(memberId).then(() => {
      const notification = {
        type: "success",
        status: true,
        message: "Block Member Successfully",
      };

      dispatch("Notification/add", notification, { root: true });
    });
  },
  unblockMember({ dispatch }, memberId) {
    Member.unblockMember(memberId).then(() => {
      const notification = {
        type: "success",
        status: true,
        message: "Member unblock Successfully",
      };

      dispatch("Notification/add", notification, { root: true });

      dispatch("getBlockMembers");
    });
  },
  getMembers({ commit }) {
    Member.getMembers().then((members) => {
      console.log(members);
      commit("SET_MEMBERS", members);
    });
  },
  getMarkMembers({ commit }) {
    Member.getMarkMember().then((members) => {
      commit("SET_MEMBERS", members);
    });
  },
  getChatMembers({ commit }) {
    commit("CHANGE_PRE_LOADING", { root: true });
    Member.getChatMembers().then((members) => {
      commit("SET_CHAT_MEMBERS", members);
      commit("CHANGE_PRE_LOADING", { root: true });
    });
  },
  async toogleTrasureMark({ commit, dispatch }, payload) {
    await Member.toogleMark(payload).then(() => {
      commit("TOOGLE_MARK", payload.id);
      const notification = {
        type: "success",
        status: true,
        message: "Update Treasure Mark",
      };

      dispatch("Notification/add", notification, { root: true });
    });
  },
  async getMemberMessages({ commit }, id) {
    await Member.getMemberMessages(id).then((messages) => {
      commit("SET_MESSAMGES", messages);
    });
  },
  async sendMessageFromAdmin({ commit }, payload) {
    let response = await Member.sendMessageFromAdmin(payload);
    commit("APPEND_MESSAMGES", response.data.data);
    commit("CHAT_MANAGE_MEMBER", response.data.data.member);
  },
  appendMessage({ commit }, payload) {
    commit("APPEND_MESSAMGES", payload);
  },
  getBlockMembers({ commit }) {
    Member.getBlockMembers().then((blockMembers) => {
      console.log(blockMembers);
      commit("SET__BLOCK_MEMBERS", blockMembers);
    });
  },
  manageMember({ commit }, payload) {
    commit("CHAT_MANAGE_MEMBER", payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
