<template>
  <v-card>
    <v-expansion-panels>
      <v-expansion-panel class="currency-store">
        <v-expansion-panel-header class="currency__header">
          New Admin
          <template v-slot:actions>
            <v-icon color="fff">mdi-arrow-down-drop-circle-outline</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-divider></v-divider>
        <v-expansion-panel-content class="mt-4">
            <admin-form @storeData="storeData"></admin-form>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>

import AdminForm from './AdminForm.vue';
export default {
  data() {
    return {
      role: "",
      name: "",
      state_id: ""
    };
  },
 
  methods: {
    storeData(data) {
      let fd = new FormData();
      fd.append("role", data.role);
      fd.append("name", data.name);
      fd.append("state_id", data.state_id);

      this.$store.dispatch("Admin/create", fd);
    }
  },
  
  components: {
    AdminForm
  }
};
</script>

<style>
</style>