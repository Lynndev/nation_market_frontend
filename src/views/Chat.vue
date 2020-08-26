<template>
  <v-container>
    <v-row class="no-gutters">
      <v-col
        cols="12"
        sm="3"
        class="flex-grow-1 flex-shrink-0"
        style="border-right: 1px solid #0000001f;"
      >
        <v-responsive class="overflow-y-auto fill-height" height="670">
          <v-list subheader>
            <v-list-item-group>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                background-color="white"
                class="mb-2"
                placeholder="search..."
                hide-details
                no-details
                outlined
                dense
              ></v-text-field>
              <template v-for="(item, index) in filterMembers">
                <v-list-item
                  @click="getMemberMessages(item.id)"
                  :key="`parent${index}`"
                  :value="item.id"
                >
                  <v-list-item-avatar>
                    <v-img v-if="item.profile" :src="item.profile"></v-img>
                    <v-img v-else :src="defaultProfile"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name" />
                  </v-list-item-content>
                </v-list-item>
                <v-divider :key="`chatDivider${index}`" class="my-0" />
              </template>
            </v-list-item-group>
          </v-list>
        </v-responsive>
      </v-col>
      <v-col cols="auto" class="flex-grow-1 flex-shrink-0">
        <chat-message :newMessages="newMessages" :memberId="memberId" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import ChatMessage from "@/components/chat/ChatMessage";
const defaultProfile = require("../assets/profile.png");

export default {
  components: {
    ChatMessage,
  },
  data() {
    return {
      defaultProfile: defaultProfile,
      memberId: null,
      search: "",
      newMessages: [],
    };
  },
  methods: {
    getMemberMessages(id) {
      this.memberId = id;
      this.$store.dispatch("Member/getMemberMessages", id).then(() => {
        if (this.messages.length > 0) {
          this.newMessages = this.messages.map((message) => {
            let body = JSON.parse(message.body);
            message.body = body;
            return message;
          });
        }
      });
    },
  },
  computed: {
    ...mapState("Member", ["members"]),
    ...mapState("Member", ["messages"]),
    ...mapState("Loading", ["loading"]),
    filterMembers() {
      return this.members.filter((member) => {
        return member.name.toLowerCase().match(this.search);
      });
    },
  },
  watch: {},
  created() {
    this.$store.dispatch("Member/getChatMembers");
  },
};
</script>

<style scoped>
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: rgba(0, 0, 0, 0.87) !important;
  background-color: #fff !important;
}
.chat-box {
  height: 87vh !important;
}
.member-list {
  overflow-y: scroll;
  height: 77vh;
}
</style>
