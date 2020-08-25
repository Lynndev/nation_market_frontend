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
        <v-responsive
          v-if="newMessages.length > 0"
          class="overflow-y-hidden fill-height"
          height="670"
        >
          <v-card class="d-flex flex-column fill-height">
            <v-card-text
              v-chat-scroll="{ smooth: true }"
              class="flex-grow-1 overflow-y-auto"
            >
              <template v-for="(msg, i) in newMessages">
                <div
                  :key="i"
                  :class="{ 'd-flex flex-row-reverse': msg.status == 2 }"
                >
                  <v-chip
                    v-if="msg.body.type == 1"
                    :color="msg.status == 2 ? 'primary' : ''"
                    dark
                    style="height:auto;white-space: normal;"
                    class="pa-2 mb-2 message"
                  >
                    {{ msg.body.text }}
                  </v-chip>
                  <!-- if message is image  -->
                  <v-chip
                    v-else
                    :color="
                      msg.status == 2 || msg.body.type == 2 ? 'primary' : ''
                    "
                    dark
                    style="height:auto;white-space: normal;"
                    class="pa-2 mb-2 message"
                  >
                    <v-img alt="profile" :src="msg.image" />
                  </v-chip>
                  <sub class="ml-2" style="font-size: 0.5rem;">
                    {{ msg.created_at | formatDateTime }}
                  </sub>
                </div>
              </template>
            </v-card-text>
            <v-card-text class="flex-shrink-1">
              <v-text-field
                v-model="adminMessage"
                label="type here..."
                type="text"
                no-details
                outlined
                dense
                append-outer-icon="send"
                append-icon="image"
                @keyup.enter="sendMessageFromAdmin"
                @click:append-outer="sendMessageFromAdmin"
                @click:append="handleRefImage"
                hide-details
              />
              <input
                ref="image"
                type="file"
                style="display:none"
                @change="sendImageFromAdmin"
              />
            </v-card-text>
          </v-card>
        </v-responsive>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
const defaultProfile = require("../assets/profile.png");

export default {
  components: {},
  data() {
    return {
      defaultProfile: defaultProfile,
      memberId: null,
      search: "",
      newMessages: [],
      adminMessage: "",
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
    handleRefImage() {
      this.$refs.image.click();
    },
    sendImageFromAdmin(e) {
      const files = e.target.files;
      let body = {};
      body.type = 2;

      let formData = new FormData();
      formData.append("member_id", this.memberId);
      formData.append("body", body);
      formData.append("image", files[0]);

      this.$store.dispatch("Member/sendMessageFromAdmin", formData);
    },
    sendMessageFromAdmin() {
      let messageForm = {
        member_id: this.memberId,
        body: { type: 1, text: this.adminMessage },
      };
      console.log(messageForm);
      this.$store.dispatch("Member/sendMessageFromAdmin", messageForm);
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
.message {
  max-width: 330px !important;
}
</style>
