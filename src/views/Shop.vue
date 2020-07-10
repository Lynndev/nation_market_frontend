<template>
  <v-container fluid>
    <header class="card-header">
      <ul class="tab-heads">
        <li
          class="tab-head"
          v-for="(mainCategory, index) in sortMainCategories"
          :key="index"
          @click="getShopByMainCatId(mainCategory.id)"
          v-bind:class="{
            'tab-head--active': mainCategoryId == mainCategory.id,
          }"
        >
          {{ mainCategory.name }}
        </li>
      </ul>
    </header>

    

    <v-row>
      <v-col v-show="mainCategoryId != 2" md="6">
       <shop-store 
       :categories="categories"
       :mainCategoryId="mainCategoryId" />
      </v-col>
      <v-col md="6">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
    
    <v-row v-show="mainCategoryId == 2">
       <v-col  v-for="(product,index) in filterProducts" :key="index" md="3">
        <product-list :product="product" />
      </v-col>
    </v-row>

    <v-row v-show="mainCategoryId != 2">
      <v-col  v-for="(shop,index) in filterShops" :key="index" md="4">
        <shop-list :shop="shop" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapGetters,mapState } from "vuex";
import ShopList from '@/components/shop/ShopList'
import ShopStore from '@/components/shop/ShopStore'
import ProductList from '@/components/product/ProductList'


export default {
  data() {
    return {
      mainCategoryId: 1,
      search:''
    };
  },
  components:{
      ShopList,
      ShopStore,
      ProductList,
  },
  methods: {
    getShopByMainCatId(mainCategoryId) {
      this.mainCategoryId = mainCategoryId

      if(mainCategoryId == 2){
        this.$store.dispatch('Product/getProductsByMarket')
      }else{
        this.$store.dispatch("Category/getCategoriesByMainId",this.mainCategoryId)

        this.$store.dispatch('Shop/getShopByMainCatId',mainCategoryId)
      }
    
    },
  },
  computed: {
    ...mapState('Shop',['shops']),
    ...mapState('Product',['products']),
    ...mapState('Category',['categories']),
    ...mapGetters("MainCategory", ["sortMainCategories"]),
    filterShops(){
      return this.shops.filter((shop) => {
          return shop.name.toLowerCase().match(this.search)
      })
    },
    filterProducts(){
      return this.products.filter((product) => {
          return product.name.toLowerCase().match(this.search)
      })
    }
  },
  mounted(){
    this.$store.dispatch('Shop/getShopByMainCatId',this.mainCategoryId)

    this.$store.dispatch("Category/getCategoriesByMainId",this.mainCategoryId)
  },
  created() {
    this.$store.dispatch("MainCategory/getMainCategories")
  },
};
</script>

<style scoped>
.card-header {
  background-color: rgba(181, 181, 177, 0.82);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  color: #fff;
  padding: 6px 8px 0;
  border-radius: 4px;
  letter-spacing: 3px;
  margin-bottom: 40px;
}
.tab-heads {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  margin-left: 6px;
  margin-top: -4px;
}

.tab-head {
  padding: 10px 18px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  position: relative;
  cursor: pointer;
}

.tab-head--active {
  background-color: #f7f8fd;
  color: var(--text-color-primary);
  transition: 0.5s;
}
 .v-text-field{
        padding-top: 0px !important;
    }
</style>
