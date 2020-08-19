<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="4">
        <currency-store />
      </v-col>
      <v-col md="6">
        <currency-list :currencys="currencys" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CurrencyStore from "@/components/currency/CurrencyStore";
import CurrencyList from "@/components/currency/CurrencyList";

import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("Currency", ["currencys"]),
  },

  components: {
    CurrencyStore,
    CurrencyList,
  },
  methods: {},

  created() {
    this.$store.dispatch("Currency/getCurrencys");
  },
};
</script>

<style scoped></style>
