<template>
  <v-row>
    <v-col md="8" offset-md="2">
      <admin-form @storeData="submitForm" :data="admin"></admin-form>
    </v-col>
  </v-row>
</template>

<script>
import AdminForm from "./components/AdminForm.vue";
import { mapState } from "vuex";
export default {
  components: {
    AdminForm
  },
  created() {
    this.$store.dispatch("Admin/getEach", {
      column: "id",
      value: this.$route.params.id
    });
  },
  computed: {
    ...mapState("Admin", ["admin"])
  },
  methods: {
    submitForm(data) {
      let fd = new FormData();
      fd.append("role", data.role);
      fd.append("name", data.name);
      fd.append("id", data.id);
      fd.append("state_id", data.state_id);
      this.$store.dispatch("Admin/update",fd);
    }
  }
};
</script>

<style>
</style>