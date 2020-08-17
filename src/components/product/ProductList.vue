<template>
  <v-card>
    <v-carousel
      hide-delimiters
      v-if="product.images"
      v-model="imageIndex"
      height="250px"
    >
      <v-carousel-item
        v-for="(image, i) in product.images"
        :key="i"
        :src="image.image"
        :lazy-scr="image.image"
        contain
        height="100%"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-carousel-item>
    </v-carousel>
    <v-divider></v-divider>

    <v-card-title>{{ product.name }} </v-card-title>

    <v-card-text>
      <div class="my-4 subtitle-1">$ • {{ product.price | separateNum }}</div>
      <div class="subtitle-1" v-if="product.member">
        {{ product.member.name }}
      </div>
      <div class="subtitle-1" v-if="product.sub_category">
        Category: {{ product.sub_category.name }}
      </div>
      <div class="mr-3 mt-2 mb-2">
        <v-btn
          @click="setProductInfo"
          small
          rounded
          depressed
          color="pink darken-2"
          dark
          >detail</v-btn
        >
      </div>
    </v-card-text>
    <product-list-modal
      :dialog="dialog"
      :product="product"
      @changeDialog="changeDialog"
    />
  </v-card>
</template>

<script>
import ProductListModal from "@/components/product/modal/ProductListModal";
export default {
  props: {
    product: {
      type: Object,
    },
  },
  components: {
    ProductListModal,
  },
  data() {
    return {
      dialog: false,
      imageIndex: 0,
    };
  },
  methods: {
    setProductInfo() {
      this.dialog = !this.dialog;
    },
    changeDialog() {
      this.dialog = !this.dialog;
    },
  },
  created() {},
};
</script>

<style scoped></style>
