<template>
  <v-container fluid>
     <!-- <v-btn 
     to="/property"
     class="edit-btn">
     <v-icon left >mdi-arrow-left-circle-outline</v-icon>
     Property
     </v-btn> -->
    <v-row justify="center">
     
      <v-col md="6">
          <category-store 
          :mainCategories="mainCategories"
          @reCheckCategoriesByMainId="reCheckCategoriesByMainId"
           />
      </v-col>
      <v-col md="6">
          <sub-category-store 
          :categories="categories"
          @reCheckSubCategoriesByCatId="reCheckSubCategoriesByCatId"
           />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col md="6">
          <category-list 
          @getCategoriesByMainId="getCategoriesByMainId" 
          @getSubCategoriesByCatId="getSubCategoriesByCatId" 
          :mainCategories="mainCategories" 
          :categories="categories" />
      </v-col>
       <v-col md="6">
          <sub-category-list :subCategories="subCategories" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import {mapState} from 'vuex'

import CategoryStore from '@/components/category/CategoryStore'
import SubCategoryStore from '@/components/category/SubCategoryStore'
import CategoryList from '@/components/category/CategoryList'
import SubCategoryList from '@/components/category/SubCategoryList'

export default {
  computed:{
    ...mapState('MainCategory',['mainCategories']),
    ...mapState('Category',['categories']),
    ...mapState('SubCategory',['subCategories']),

  },
  
  components:{
      CategoryStore,
      SubCategoryStore,
      CategoryList,
      SubCategoryList,
  },
  methods:{
    getCategoriesByMainId(mainId){
      this.$store.dispatch('Category/getCategoriesByMainId',mainId)
    },
    getSubCategoriesByCatId(catId){
      this.$store.dispatch('SubCategory/getSubCategoriesByCatId',catId)
    },
    reCheckCategoriesByMainId(mainId){
      this.getCategoriesByMainId(mainId)
    },
    reCheckSubCategoriesByCatId(catId){
      this.getSubCategoriesByCatId(catId)
    }
  },

  created(){
    this.$store.dispatch('MainCategory/getMainCategories')
    
  }
};
</script>

<style scoped>
   
</style>
