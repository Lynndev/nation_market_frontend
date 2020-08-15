<template>
  <v-container fluid>
    <toolbar :routeName="routeName" />
    <v-row justify="center">
      <v-col md="12">
        <v-card>
          <h2 class="form-title pa-3">Member Store</h2>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col md="5">
                <v-row justify="center">
                  <input
                    ref="fileProfile"
                    type="file"
                    style="display:none"
                    @change="onProfileImagePicked"
                  />
                  <v-avatar
                    @click="clickprofileImage"
                    size="150px"
                    v-ripple
                    class="grey center lighten-3 mb-3"
                  >
                    <v-img alt="profile" :src="selectProfileImage" />
                  </v-avatar>
                </v-row>

                <label>Name</label>
                <v-text-field
                  v-model="member.name"
                  :error-messages="nameErrors"
                  outlined
                  clearable
                  dense
                >
                </v-text-field>
                <label>Phone</label>
                <v-text-field
                  v-model="member.phone"
                  :error-messages="phoneErrors"
                  outlined
                  clearable
                  dense
                >
                </v-text-field>

                <v-select
                  :items="states"
                  class="mb-4"
                  item-text="name"
                  item-value="id"
                  hide-details
                  label="choose state"
                  @change="getTownshipByState"
                  return-object
                  solo
                >
                </v-select>

                <v-select
                  v-show="showTownship"
                  :items="townships"
                  v-model="member.township_id"
                  item-text="name"
                  item-value="id"
                  hide-details
                  label="choose Township"
                  solo
                >
                </v-select>
              </v-col>
              <v-col md="7">
                <v-row>
                  <v-col md="6">
                    <p class="text-center">NRC FRONT</p>
                    <input
                      ref="fileNrcFront"
                      type="file"
                      style="display:none"
                      @change="onNrcFrontPicked"
                    />
                    <div @click="clicktNrcFront">
                      <v-img :src="selectNrcFront" aspect-ratio="1.5" contain>
                      </v-img>
                    </div>
                  </v-col>
                  <v-col md="6">
                    <p class="text-center">NRC BACK</p>
                    <input
                      ref="fileNrcBack"
                      type="file"
                      style="display:none"
                      @change="onNrcBackPicked"
                    />
                    <div @click="clicktNrcBack">
                      <v-img :src="selectNrcBack" aspect-ratio="1.5" contain>
                      </v-img>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="!member.code"
              type="submit"
              @click="storeMember"
              class="submit-btn"
            >
              <v-icon small left>mdi-checkbox-marked-circle-outline</v-icon
              >Submit
            </v-btn>
            <template v-else>
              <v-btn type="submit" @click="blockMember" class="submit-btn">
                <v-icon small left>mdi-account-cancel-outline</v-icon>Block this
                member
              </v-btn>
              <v-btn type="submit" @click="updateMember" class="edit-btn">
                <v-icon small left>mdi-pencil-outline</v-icon>update
              </v-btn>
            </template>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import Toolbar from "@/components/includes/Toolbar";
import { MemberImageUpload } from "@/mixins/MemberImageUpload";
import { mapState } from "vuex";

const defaultImage = require("../assets/nrc.png");
const defaultProfile = require("../assets/profile.png");

export default {
  mixins: [MemberImageUpload],
  props: {
    member: {
      type: Object,
      default: () => {
        return {
          name: null,
          phone: null,
          profile: null,
          front_nrc: null,
          back_nrc: null,
          township_id: null,
        };
      },
    },
  },
  data: () => ({
    defaultImage: defaultImage,
    defaultProfile: defaultProfile,
    townshipId: null,
    showTownship: false,
    routeName: "member",
  }),
  validations: {
    member: {
      name: {
        required,
      },
      phone: {
        required,
      },
    },
  },
  components: {
    Toolbar,
  },
  computed: {
    ...mapState("States", ["states"]),
    ...mapState("Township", ["townships"]),
  },
  methods: {
    storeMember() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let fd = new FormData();
        fd.append("id", this.member.id);
        fd.append("name", this.member.name);
        fd.append("phone", this.member.phone);
        fd.append("profile", this.profileImageFile);
        fd.append("back_nrc", this.nrcBackImageFile);
        fd.append("front_nrc", this.nrcFrontImageFile);
        fd.append("township_id", this.member.township_id);

        this.$store.dispatch("Member/storeMember", fd);

        this.member.name = "";
        this.member.phone = "";

        this.$v.$reset();
      }
    },
    getTownshipByState(state) {
      console.log(state.id);
      this.showTownship = true;
      this.$store.dispatch("Township/getTownshipByStateId", state.id);
    },
    blockMember() {
      if (this.member.id) {
        this.$store.dispatch("Member/blockMember", this.member.id);
      }
    },
    updateMember() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let fd = new FormData();
        fd.append("id", this.member.id);
        fd.append("name", this.member.name);
        fd.append("phone", this.member.phone);
        if (this.profileImageFile) fd.append("profile", this.profileImageFile);
        if (this.nrcBackImageFile) fd.append("back_nrc", this.nrcBackImageFile);
        if (this.nrcFrontImageFile)
          fd.append("front_nrc", this.nrcFrontImageFile);
        fd.append("township_id", this.member.township_id);

        this.$store.dispatch("Member/updateMember", fd);

        this.member.name = "";
        this.member.phone = "";

        this.$v.$reset();
      }
    },
  },
  created() {
    this.$store.dispatch("States/getStates");

    console.log(this.member);
  },
};
</script>

<style scoped></style>
