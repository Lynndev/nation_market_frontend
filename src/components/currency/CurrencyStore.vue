<template>
  <v-card>
    <v-expansion-panels>
      <v-expansion-panel class="currency-store">
        <v-expansion-panel-header class="currency__header">
          Currency Store
          <template v-slot:actions>
            <v-icon color="fff">mdi-arrow-down-drop-circle-outline</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-divider></v-divider>
        <v-expansion-panel-content class="mt-4">
          <label>Date</label>
          <v-menu
            :close-on-content-click="true"
            :nudge-bottom="40"
            transition="scale-transition"
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field v-model="date" readonly dense outlined v-on="on">
              </v-text-field>
            </template>
            <v-date-picker
              @input="menu2 = false"
              v-model="date"
              no-title
            ></v-date-picker>
          </v-menu>
          <label>Kyat</label>
          <v-text-field v-model="kyat" outlined clearable dense> </v-text-field>
          <label>Yuan</label>
          <v-text-field v-model="yuan" outlined clearable dense> </v-text-field>
          <label>Baht</label>
          <v-text-field v-model="baht" outlined clearable dense> </v-text-field>
          <v-spacer></v-spacer>
          <v-btn
            @click.prevent="storePaymentMethod"
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
export default {
  data() {
    return {
      date: null,
      kyat: null,
      yuan: null,
      baht: null,
    };
  },
  methods: {
    storePaymentMethod() {
      let data = {
        date: this.date,
        kyat: this.kyat,
        yuan: this.yuan,
        baht: this.baht,
      };

      this.$store.dispatch("Currency/storeCurrency", data);

      this.date = "";
      this.kyat = null;
      this.yuan = null;
      this.baht = null;
    },
  },
  computed: {},
};
</script>

<style scoped>
.v-expansion-panel:before {
  box-shadow: var(--box-shadow) !important;
}
.currency-store {
  background-color: var(--background-transparent) !important;
}
.currency__header {
  font-size: 17px;
  color: var(--text-color-primary) !important;
}
.theme--light.v-expansion-panels
  .v-expansion-panel-header
  .v-expansion-panel-header__icon
  .v-icon {
  color: var(--text-color-primary) !important;
}
.main-category-title {
  color: var(--text-color-primary) !important;
  font-weight: var(--text-weight) !important;
}
.main-category-btn {
  background-color: rgba(160, 148, 157, 0.69) !important;
  border-radius: 15px;
  color: #fff;
  box-shadow: var(--box-shadow) !important;
}
.main-category-btn-active {
  background-color: rgba(215, 143, 197, 0.69) !important;
  border-radius: 15px;
  color: #fff;
  box-shadow: var(--box-shadow) !important;
}
</style>
