<template>
  <v-card>
    <div
      @click="showShopDetail(shop)"
      class="d-flex flex-column justify-space-between cursor-pointer"
    >
      <div class="d-flex">
        <v-avatar class="ma-3" size="125" tile>
            <v-img v-if="shop.logo" :src="shop.logo"></v-img>
        </v-avatar>
        <div class="d-flex flex-column">
            <v-card-title class="headline" v-text="shop.name"></v-card-title>

            <v-card-subtitle v-text="shop.member.name"></v-card-subtitle>
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
  </v-card>
</template>

<script>

export default {
  props: {
    shop: {
      type: Object,
      default:() => {
        return{
          name:'',
          logo:'',
          description:'',
          category:'',
        }
      }
    },
  },
  computed:{
  },
  methods: {
    showShopDetail(shop) {
      this.$store.dispatch('Shop/getShopDetail',shop)
    },
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer !important;
}
</style>
