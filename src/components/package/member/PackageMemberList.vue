<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="memberPackages"
      :loading="loading"
      :items-per-page="5"
    >
      <template v-slot:item.price="{ item }">
        {{ item.price | separateNum }}
      </template>
      
      <template v-slot:item.actions="{ item }">
        <v-btn
          @click="showUpdatePackage(item)"
          color="grey darken-1"
          class="white--text"
          depressed
        >
          <v-icon small>
            mdi-pencil-outline
          </v-icon>
          <v-icon small>
            mdi-delete-outline
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <update-member-package
      :dialog="dialog"
      :onePackage="onePackage"
      @changeDialog="changeDialog"
    />
  </v-card>
</template>

<script>
import UpdateMemberPackage from "@/components/package/modal/UpdateMemberPackage";
import { mapState } from "vuex";

export default {
  props: {
    memberPackages: {
      type: Array,
    },
  },
  components: {
    UpdateMemberPackage,
  },
  computed: {
    ...mapState("Loading", ["loading"]),
  },
  data() {
    return {
      dialog: false,
      onePackage: {},
      headers: [
        { text: "Name", value: "name" },
        { text: "Price", value: "price" },
        { text: "Duration", value: "duration" },
        { text: "actions", value: "actions" },
      ],
    };
  },
  methods: {
    showUpdatePackage(onePackage) {
      this.dialog = !this.dialog;
      this.onePackage = onePackage;
    },
    changeDialog() {
      this.dialog = !this.dialog;
    },
  },
};
</script>

<style scoped>
.header {
  padding: 15px 0px;
}
.link-click {
  cursor: pointer;
}
.link-click:hover {
  color: #5020ff;
}
.link-click-active {
  color: #5020ff !important;
}
.header-title {
  font-family: var(--title-font-family) !important;
  letter-spacing: var(--text-spacing);
  font-weight: var(--text-weight);
  font-size: 18px;
  margin: 0px 10px;
  text-transform: uppercase;
}
</style>
