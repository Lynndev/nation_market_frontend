<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ product.name }} </span>
          <v-spacer />
          <v-icon @click="changeDialog" left>mdi-close</v-icon>
        </v-card-title>
        <v-divider class="mb-2" />
        <v-carousel hide-delimiters v-if="product.images" height="250px">
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

        <v-card-text>
          <div class="mt-3 subtitle-1">
            $ - {{ product.price | separateNum }}
          </div>
          <div v-if="product.discount" class="subtitle-1">
            Discount - {{ product.discount | separateNum }}
          </div>
          <div v-if="product.last_price" class="mb-2 subtitle-1">
            Last Price - {{ product.last_price }}
          </div>

          <div v-if="product.order_time" class="mb-2 subtitle-1">
            Order Time - {{ product.order_time }}
          </div>

          <div v-if="product.size" class="mb-2 subtitle-1">
            Size - {{ product.size | separateNum }}
          </div>

          <div v-if="product.used" class="mb-2 subtitle-1">
            Used - {{ product.used }}
          </div>

          <div class="subtitle-1" v-if="product.member">
            Customer: {{ product.member.name }}
          </div>
          <div class="subtitle-1" v-if="product.sub_category">
            Category: {{ product.sub_category.name }}
          </div>

          <div class="subtitle-1" v-if="product.color">
            Color: {{ product.color }}
          </div>
          <div class="subtitle-1" v-if="product.delivery">
            Color: {{ product.delivery }}
          </div>
          <div class="subtitle-1" v-if="product.description">
            Description: {{ product.description }}
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
    },
    dialog: {
      type: Boolean,
    },
  },
  data() {
    return {
      deleteStatus: false,
    };
  },
  components: {},
  methods: {
    changeDialog() {
      this.$emit("changeDialog");
    },
  },
};
</script>
