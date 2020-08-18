<template>
  <v-card>
    <v-expansion-panels>
      <v-expansion-panel class="payment-store">
        <v-expansion-panel-header class="payment__header">
          Payment Method Store
          <template v-slot:actions>
            <v-icon color="fff">mdi-arrow-down-drop-circle-outline</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-divider></v-divider>
        <v-expansion-panel-content class="mt-4">
          <label>Payment</label>
          <v-text-field v-model="name" outlined clearable dense> </v-text-field>
          <p class="text-center">Payment Image</p>
          <input
            ref="refFileImage"
            type="file"
            style="display:none"
            @change="paymentImagePickHandler"
          />
          <div @click="clickRefFileImage" class="mb-5">
            <v-img :src="paymentImageHandler" aspect-ratio="1.5" contain>
            </v-img>
          </div>
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
const defaultImage = require("../../assets/nrc.png");

export default {
  data() {
    return {
      name: "",
      paymentImageFile: "",
      paymentImageResult: "",
      defaultImage: defaultImage,
    };
  },
  methods: {
    storePaymentMethod() {
      let fd = new FormData();
      fd.append("name", this.name);
      fd.append("image", this.paymentImageFile);

      this.$store.dispatch("PaymentMethod/storePaymentMethod", fd);

      this.name = "";
      this.paymentImageFile = "";
      this.paymentImageResult;
    },
    clickRefFileImage() {
      //handle image's ref click event
      this.$refs.refFileImage.click();
    },
    paymentImagePickHandler(e) {
      const files = e.target.files;
      const fr = new FileReader();
      fr.readAsDataURL(files[0]);
      fr.addEventListener("load", () => {
        this.paymentImageResult = fr.result;
        this.paymentImageFile = files[0]; // this is an image file that can be sent to server...
      });
    },
  },
  computed: {
    paymentImageHandler() {
      if (!this.paymentImageResult) {
        return this.defaultImage;
      } else {
        return this.paymentImageResult;
      }
    },
  },
};
</script>

<style scoped>
.v-expansion-panel:before {
  box-shadow: var(--box-shadow) !important;
}
.payment-store {
  background-color: var(--background-transparent) !important;
}
.payment__header {
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
