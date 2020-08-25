import Member from "./../../services/Member";
import router from "./../../router/index";

const state = {
  members: [],
  blockMembers: [],
  messages: [],
};
const getters = {};
const mutations = {
  SET_MEMBERS(state, members) {
    state.members = members.data.data;
  },
  SET_MESSAMGES(state, messages) {
    state.messages = messages.data.data;
    console.log(state.messages);
  },
  SET__BLOCK_MEMBERS(state, blockMembers) {
    state.blockMembers = blockMembers.data.data;
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
  getChatMembers({ commit }) {
    Member.getChatMembers().then((members) => {
      console.log(members);
      commit("SET_MEMBERS", members);
    });
  },
  async getMemberMessages({ commit }, id) {
    await Member.getMemberMessages(id).then((messages) => {
      commit("SET_MESSAMGES", messages);
    });
  },
  sendMessageFromAdmin({ dispatch }, payload) {
    Member.sendMessageFromAdmin(payload).then((response) => {
      dispatch("getMemberMessages", payload.member_id).then(() => {
        console.log(response);
      });
    });
  },
  getBlockMembers({ commit }) {
    Member.getBlockMembers().then((blockMembers) => {
      console.log(blockMembers);
      commit("SET__BLOCK_MEMBERS", blockMembers);
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
