import MsgNote from "./../../services/MsgNote";

const state = {
  notes: [],
};
const getters = {};
const mutations = {
  SET_NOTES(state, payload) {
    state.notes = payload;
  },
  APPEND_NOTES(state, payload) {
    state.notes.push(payload);
  },
  REMOVE_NOTES(state, payload) {
    state.notes = state.notes.filter((val) => {
      return val.id != payload;
    });
  },
};

const actions = {
  storeMsgNote({ dispatch, commit }, payload) {
    MsgNote.store(payload).then((response) => {
      const notification = {
        type: "success",
        status: true,
        message: "Create Message Note Successfully",
      };
      commit("APPEND_NOTES", response.data.data);
      dispatch("Notification/add", notification, { root: true });
    });
  },
  getMsgNotes({ commit }) {
    MsgNote.get().then((response) => {
      console.log(response.data.data);
      commit("SET_NOTES", response.data.data);
    });
  },
  deleteMsgNote({ commit, dispatch }, payload) {
    MsgNote.delete({ id: payload }).then(() => {
      const notification = {
        type: "success",
        status: true,
        message: "Delete Message Note Successfully",
      };
      dispatch("Notification/add", notification, { root: true });
      commit("REMOVE_NOTES", payload);
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
