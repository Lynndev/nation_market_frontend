<template>
  <v-container fluid>
    <toolbar :routeName="routeName" />
    <v-row>
      <v-col md="12">
        <v-card>
          <v-row>
            <v-col md="8">
              <div
                @click="showShopDetail(shop)"
                class="d-flex flex-column justify-space-between cursor-pointer"
              >
                <div class="d-flex">
                  <v-avatar class="ma-3" size="125" tile>
                    <v-img v-if="shop.logo" :src="shop.logo"></v-img>
                  </v-avatar>
                  <div class="d-flex flex-column">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ shop.name }}
                          <v-btn
                            class="ml-2"
                            @click="changeStatus"
                            small
                            outlined
                            :color="btnStatus.color"
                            >{{ btnStatus.text }}</v-btn
                          >
                        </v-list-item-title>
                        <v-list-item-subtitle>{{
                          shop.member.name
                        }}</v-list-item-subtitle>
                        <v-list-item-subtitle>{{
                          shop.description
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </div>
                </div>
                <div>
                  <v-chip
                    small
                    v-for="(category, index) in shop.categories"
                    :key="index"
                    class="ma-2"
                  >
                    {{ category.name }}
                  </v-chip>
                </div>
              </div>
            </v-col>
            <v-col md="4">
              <v-carousel v-if="shop.images" v-model="model" height="250px">
                <v-carousel-item
                  v-for="(image, i) in shop.images"
                  :key="i"
                  :src="image.image"
                  contain
                  height="100%"
                >
                </v-carousel-item>
              </v-carousel>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(product, index) in products" :key="index" md="3">
        <product-list :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Toolbar from "@/components/includes/Toolbar";
import { mapState } from "vuex";
import ProductList from "@/components/product/ProductList";

export default {
  data() {
    return {
      model: 0,
      routeName: "shop",
    };
  },
  computed: {
    ...mapState("Shop", ["shop"]),
    ...mapState("Product", ["products"]),
    btnStatus() {
      let status = {
        color: "#488fef",
        text: "Active",
      };
      if (this.shop.status != 1) {
        status.color = "red";
        status.text = "inactive";
      }
      return status;
    },
  },
  methods: {
    changeStatus() {
      let data = {
        id: this.shop.id,
        status: 0,
      };
      if (this.shop.status == 1) {
        data.status = 2;
      } else {
        data.status = 1;
      }
    },
  },
  components: {
    Toolbar,
    ProductList,
  },
  created() {
    this.$store.dispatch("Product/getProductsByShopId", this.shop.id);
  },
};
</script>

<style scoped></style>
