<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Update Payment Method</span>
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <label>Payment</label>
          <v-text-field v-model="paymentMethod.name" outlined clearable dense>
          </v-text-field>
          <p class="subtitle-1">Payment Image</p>
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
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-1" outlined @click="changeDialog"
            >Cancel</v-btn
          >
          <v-btn color="red darken-1" outlined @click="deletePaymentMethod"
            >Delete</v-btn
          >
          <v-btn color="orange darken-1" outlined @click="updatePaymentMethod"
            >Update</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    paymentMethod: {
      type: Object,
    },
    dialog: {
      type: Boolean,
    },
  },
  data() {
    return {
      paymentImageResult: "",
      paymentImageFile: "",
    };
  },
  computed: {
    paymentImageHandler() {
      if (this.paymentImageResult) {
        return this.paymentImageResult;
      } else {
        return this.paymentMethod.image;
      }
    },
  },
  methods: {
    changeDialog() {
      this.$emit("changeDialog");
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
    deletePaymentMethod() {
      if (this.paymentMethod) {
        let data = {
          id: this.paymentMethod.id,
        };
        this.$store.dispatch("PaymentMethod/deletePaymentMethod", data);

        this.paymentMethod.name = "";
        this.paymentImageFile = "";
        this.paymentMethod.image = "";

        this.changeDialog();
      }
    },
    updatePaymentMethod() {
      let fd = new FormData();
      fd.append("id", this.paymentMethod.id);
      fd.append("name", this.paymentMethod.name);
      if (this.paymentImageFile) fd.append("image", this.paymentImageFile);

      this.$store.dispatch("PaymentMethod/updatePaymentMethod", fd);

      this.paymentMethod.name = "";
      this.paymentImageFile = "";
      this.paymentMethod.image = "";

      this.changeDialog();
    },
  },
};
</script>
