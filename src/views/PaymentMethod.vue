<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="4">
        <payment-method-store />
      </v-col>
      <v-col md="6">
        <payment-method-list :paymentMethods="paymentMethods" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaymentMethodStore from "@/components/payment-method/PaymentMethodStore";
import PaymentMethodList from "@/components/payment-method/PaymentMethodList";

import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("PaymentMethod", ["paymentMethods"]),
  },

  components: {
    PaymentMethodStore,
    PaymentMethodList,
  },
  methods: {},

  created() {
    this.$store.dispatch("PaymentMethod/getPaymentMethods");
  },
};
</script>

<style scoped></style>
