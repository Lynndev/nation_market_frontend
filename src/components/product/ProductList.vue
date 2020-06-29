<template>
  <v-card >
    <v-carousel hide-delimiters v-if="product.images" v-model="model" height="250px">
      <v-carousel-item
        v-for="(image, i) in product.images"
        :key="i"
        :src="image.image"
        contain
        height="100%"
      >
      </v-carousel-item>
    </v-carousel>
    <v-divider></v-divider>

    <v-card-title>{{product.name}}</v-card-title>

    <v-card-text>
        <div class="my-4 subtitle-1">$ • {{ product.price }}</div>
        <div class="subtitle-1" v-if="product.member">
            {{product.member.name}}
        </div>
        <div class="subtitle-1" v-if="product.sub_category">
            {{product.sub_category.name}}
        </div>
        
        <div>
            {{product.description}}
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
  data(){
      return{
          model:0
      }
  },
  created(){
      console.log(this.product);
  }
};
</script>

<style scoped></style>
