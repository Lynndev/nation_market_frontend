<template>
     <v-card>
        <div class="d-flex align-baseline flex-row header">
          <div>
            <h2 class="header-title">Category Table</h2>
            <v-select
              :items="mainCategories"
              class="ml-1"
              item-text="name"
              item-value="id"
              hide-details
              label="choose main category"
              @change="getCategoriesByMainId"
              solo>
            </v-select>  
          </div>
          <div></div>
         
        </div>
        <v-data-table
        :headers="headers"
        :items="categories"
        :loading="loading"
        :items-per-page="5"
        >
        <template v-slot:item.name="{ item }" >
          <span class="link-click" :class="{'link-click-active':activeId == item.id}" @click="getSubCategoriesByCatId(item)">{{item.name}}</span>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn @click="showUpdateCategory(item)" color="grey darken-1" class="white--text" depressed>
            <v-icon small >
              mdi-pencil-outline
            </v-icon>
           <v-icon small >
              mdi-delete-outline
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <update-category 
      :dialog="dialog"
      :oneCategory="oneCategory"
      @changeDialog="changeDialog"
       />
    </v-card>
</template>

<script>

import UpdateCategory from '@/components/category/modal/UpdateCategory'
import {mapState} from 'vuex'

export default {
    props:{
        categories:{
            type:Array
        },
        mainCategories:{
            type:Array
        }
    },
    components:{
      UpdateCategory
    },
    computed:{
      ...mapState('Loading',['loading'])
    },
    data() {
      return {
        dialog:false,
        oneCategory:{},
        activeId:0,
        headers: [
          { text: "Name", value: "name",},
          { text: "Myanmar Name", value: "mm_name",},
          { text: "Chinese Name", value: "cn_name",},
          { text: "actions",value:'actions'},
        ],
    };
  },
  methods:{
    getCategoriesByMainId(id){
      this.$emit('getCategoriesByMainId',id)
    },
    getSubCategoriesByCatId(category){
      this.activeId = category.id
      this.$emit('getSubCategoriesByCatId',category.id)
    },
    showUpdateCategory(category){
      this.dialog = !this.dialog
      this.oneCategory = category
    },
    changeDialog(){
      this.dialog = !this.dialog
    }
  }
}
</script>

<style scoped>
.header{
  padding: 15px 0px;

}
.link-click{
  cursor: pointer;
}
.link-click:hover{
  color: #5020ff;
}
.link-click-active{
  color: #5020ff !important;
}
.header-title{
    font-family: var(--title-font-family) !important;
    letter-spacing: var(--text-spacing);
    font-weight: var(--text-weight);
    font-size: 18px;
    margin: 0px 10px;
    text-transform: uppercase;
}
</style>