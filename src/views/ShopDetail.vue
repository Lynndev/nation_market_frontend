<template>
  <v-container fluid>
    <toolbar :routeName="routeName" />
    <v-row>
      <v-col md="12">
        <v-card>
          <v-row>
            <v-col md="8">
              <div class="d-flex flex-column">
                <div class="d-flex">
                  <v-avatar class="ma-3" size="135" tile>
                    <v-img v-if="shop.logo" :src="shop.logo"></v-img>
                  </v-avatar>
                  <div class="d-flex flex-column shop-detail">
                    <div>
                      <span class="shop-name">{{ shop.name }}</span>
                      <v-btn
                        class="ml-2"
                        @click="changeStatus"
                        small
                        outlined
                        :color="btnStatus.color"
                        >{{ btnStatus.text }}</v-btn
                      >
                    </div>
                    <div>
                      <p class="member-name">Name: {{ shop.member.name }}</p>
                    </div>
                    <div>
                      <p v-if="!readMoreActivated" class="description">
                        {{ shop.description.slice(0, 200) }}
                        <a
                          v-show="shop.description.length >= 200"
                          class="read-more"
                          v-if="!readMoreActivated"
                          @click="activateReadMore"
                          href="#"
                        >
                          read more...
                        </a>
                      </p>
                      <p v-else class="description">
                        {{ shop.description }}
                        <a
                          class="read-more"
                          v-if="readMoreActivated"
                          @click="activateReadMore"
                          href="#"
                        >
                          show less...
                        </a>
                      </p>
                    </div>
                  </div>
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
            </v-col>
            <v-col md="4">
              <v-carousel v-if="shop.images" v-model="model" height="250px">
                <v-carousel-item
                  v-for="(image, i) in shop.images"
                  :key="i"
                  :src="image.image"
                  :lazy-src="image.image"
                  contain
                  height="100%"
                >
                </v-carousel-item>
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
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
      readMoreActivated: false,
    };
  },
  computed: {
    ...mapState("Product", ["products"]),
    ...mapState("Shop", ["shop"]),
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
        this.$store.dispatch("Shop/changeStatus", data);
      } else {
        data.status = 1;
        this.$store.dispatch("Shop/changeStatus", data);
      }
    },
    activateReadMore() {
      this.readMoreActivated = !this.readMoreActivated;
    },
  },
  components: {
    Toolbar,
    ProductList,
  },
  created() {
    this.$store.dispatch("Shop/getEachShop", { id: this.$route.params.shopId });
    this.$store.dispatch(
      "Product/getProductsByShopId",
      this.$route.params.shopId
    );
  },
};
</script>

<style scoped>
.shop-name {
  color: var(--text-color-primary);
  font-size: 20px;
  letter-spacing: var(--text-spacing);
}
.member-name {
  letter-spacing: var(--text-spacing);
  color: var(--text-color-primary);
}
.description {
  color: var(--text-color-primary) !important;
  line-height: 2;
}
.read-more {
  color: #3ad1f1 !important;
  text-decoration: none !important;
}
</style>
