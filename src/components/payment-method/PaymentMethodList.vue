<template>
  <v-card>
    <div class="d-flex align-baseline flex-row header">
      <div>
        <h2 class="header-title">Payment Method Table</h2>
      </div>
    </div>
    <v-data-table
      :headers="headers"
      :loading="loading"
      :items="paymentMethods"
      :items-per-page="5"
    >
      <template v-slot:item.image="{ item }">
        <v-img
          @click="showImage(item)"
          :src="item.image"
          width="100px"
          height="100px"
          contain
        >
        </v-img>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          @click="setPaymentMethod(item)"
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

    <update-payment-method
      :dialog="dialog"
      :paymentMethod="paymentMethod"
      @changeDialog="changeDialog"
    />
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import UpdatePaymentMethod from "@/components/payment-method/modal/UpdatePaymentMethod";

export default {
  props: {
    paymentMethods: {
      type: Array,
    },
  },
  computed: {
    ...mapState("Loading", ["loading"]),
  },
  components: {
    UpdatePaymentMethod,
  },
  data() {
    return {
      dialog: false,
      paymentMethod: {},
      headers: [
        { text: "Payment", value: "name" },
        { text: "Payment Image", value: "image" },
        { text: "Action", value: "actions" },
      ],
    };
  },
  methods: {
    setPaymentMethod(paymentMethod) {
      this.dialog = !this.dialog;
      this.paymentMethod = paymentMethod;
      console.log(this.paymentMethod);
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
.header-title {
  font-family: var(--title-font-family) !important;
  letter-spacing: var(--text-spacing);
  font-weight: var(--text-weight);
  font-size: 18px;
  margin: 0px 10px;
  text-transform: uppercase;
}
</style>
