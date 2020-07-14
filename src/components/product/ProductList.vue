<template>
  <v-card>
    <v-carousel
      hide-delimiters
      v-if="product.images"
      v-model="model"
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

    <v-card-title>{{ product.name }}</v-card-title>

    <v-card-text>
      <div class="my-4 subtitle-1">$ • {{ product.price }}</div>
      <div class="subtitle-1" v-if="product.member">
        {{ product.member.name }}
      </div>
      <div class="subtitle-1" v-if="product.sub_category">
        Category: {{ product.sub_category.name }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
    },
  },
  data() {
    return {
      model: 0,
    };
  },
  created() {
  },
};
</script>

<style scoped></style>
