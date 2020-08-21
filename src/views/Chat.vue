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
            <v-list-item-group v-model="activeChat">
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
                <v-list-item :key="`parent${index}`" :value="item.id">
                  <v-list-item-avatar color="grey lighten-1 white--text">
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
          v-if="activeChat"
          class="overflow-y-hidden fill-height"
          height="670"
        >
          <v-card class="d-flex flex-column fill-height">
            <v-card-title>
              john doe
            </v-card-title>
            <v-card-text class="flex-grow-1 overflow-y-auto">
              <template v-for="(msg, i) in messages">
                <div :key="i" :class="{ 'd-flex flex-row-reverse': msg.me }">
                  <v-chip
                    :color="msg.me ? 'primary' : ''"
                    dark
                    style="height:auto;white-space: normal;"
                    class="pa-2 mb-2"
                  >
                    {{ msg.content }}
                  </v-chip>
                  <sub class="ml-2" style="font-size: 0.5rem;">{{
                    msg.created_at
                  }}</sub>
                </div>
              </template>
            </v-card-text>
            <v-card-text class="flex-shrink-1">
              <v-text-field
                v-model="messageForm.content"
                label="type here..."
                type="text"
                no-details
                outlined
                dense
                append-outer-icon="send"
                @keyup.enter="messages.push(messageForm)"
                @click:append-outer="messages.push(messageForm)"
                hide-details
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
  data() {
    return {
      defaultProfile: defaultProfile,
      search: "",
      activeChat: 1,
      messageForm: {
        content: "",
        me: true,
        created_at: "11:11am",
      },
      messages: [
        {
          content: "lorem ipsum",
          me: true,
          created_at: "11:11am",
        },
        {
          content: "lorem ipsum",
          me: true,
          created_at: "11:11am",
        },
        {
          content: "lorem ipsum",
          me: true,
          created_at: "11:11am",
        },
        {
          content: "lorem ipsum",
          me: true,
          created_at: "11:11am",
        },
        {
          content: "dolor",
          me: false,
          created_at: "11:11am",
        },
        {
          content: "dolor",
          me: false,
          created_at: "11:11am",
        },
        {
          content: "dolor",
          me: false,
          created_at: "11:11am",
        },
        {
          content: "dolor",
          me: true,
          created_at: "11:11am",
        },
        {
          content: "dolor",
          me: false,
          created_at: "11:12am",
        },
        {
          content: "dolor",
          me: false,
          created_at: "11:14am",
        },
      ],
    };
  },
  computed: {
    ...mapState("Member", ["members"]),
    filterMembers() {
      return this.members.filter((member) => {
        return member.name.toLowerCase().match(this.search);
      });
    },
  },
  created() {
    this.$store.dispatch("Member/getMembers");
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
