<template>
  <v-card>
    <v-expansion-panels>
      <v-expansion-panel class="state-store">
        <v-expansion-panel-header class="state-store__header">
          States Store
          <template v-slot:actions>
            <v-icon color="fff">mdi-arrow-down-drop-circle-outline</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-divider></v-divider>
        <v-expansion-panel-content class="mt-4">
          <label>State Name</label>
          <v-text-field
            v-model="name"
            outlined
            clearable
            dense
          >
          </v-text-field>
          <v-spacer></v-spacer>
          <v-btn
            @click.prevent="storeState"
            type="submit"
            class="submit-btn"
          >
            <v-icon small left>mdi-checkbox-marked-circle-outline</v-icon>Submit
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      name: "",
    };
  },
  validations: {
    name: {
      required,
    },
  },
  methods: {
    storeState() {
      this.$v.$touch()
      if (!this.$v.$invalid) {

        let data = {
          name: this.name,
        };
        this.$store.dispatch("States/storeState", data)
        
        this.name = "";    
        this.$v.$reset();
      }
    },
  },
};
</script>

<style scoped>
.v-expansion-panel:before {
  box-shadow: var(--box-shadow) !important;
}
.state-store {
  background-color: var(--background-transparent) !important;
}
.state-store__header {
  font-size: 17px;
  color: var(--text-color-primary) !important;
}
.theme--light.v-expansion-panels
  .v-expansion-panel-header
  .v-expansion-panel-header__icon
  .v-icon {
  color: var(--text-color-primary) !important;
}
</style>
