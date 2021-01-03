<template>
  <v-row>
    <v-col md="8" offset-md="2">
      <admin-store></admin-store>
    </v-col>
    <v-col md="10" offset-md="1">
      <v-data-table :headers="headers" :loading="loading" :items="admins" :items-per-page="10">
        <template v-slot:item.state="{ item }">
          {{ item.state.name }}
        </template>
        <template v-slot:item.role="{ item }">
          <span v-if="item.role==1">Admin</span>
          <span v-else-if="item.role==2">Editor</span>
          <span v-else-if="item.role==3">Main Admin</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon color="blue darken-2" class="mr-2" @click="$router.push(`/admin/edit/${item.id}`)">mdi-pencil-outline</v-icon>
          <v-icon color="red darken-2" class="mr-2" @click="deleteAdmin(item)">mdi-delete-outline</v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import AdminStore from "./components/AdminStore.vue";
import { mapState } from "vuex";
export default {
  components: {
    AdminStore
  },
  created() {
    this.$store.dispatch("Admin/get");
  },
  computed: {
    ...mapState("Admin", ["admins"])
  },
  methods: {
    deleteAdmin(item) {
      this.$store.dispatch("Admin/delete", item.id);
    }
  },
  data() {
    return {
      headers: [
        {
          text: "Name",
          value: "name",
          align: "center"
        },
        {
          text: "Role",
          value: "role",
          align: "center"
        },
        {
          text: "State",
          value: "state",
          align: "center"
        },

        {
          text: "actions",
          value: "actions",
          align: "center"
        }
      ]
    };
  }
};
</script>

<style>
</style>