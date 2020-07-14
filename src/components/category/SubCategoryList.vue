<template>
     <v-card>
        <div class="d-flex align-baseline flex-row header">
          <div>
             <h2 class="header-title">Sub Category Table</h2>
          </div>
        </div>
        <v-data-table
        :headers="headers"
        :items="subCategories"
        :loading="loading"
        :items-per-page="5">
        <template v-slot:item.actions="{ item }">
          <v-btn @click="showUpdateSubCategory(item)" color="grey darken-1" class="white--text" depressed>
            <v-icon small >
              mdi-pencil-outline
            </v-icon>
           <v-icon small >
              mdi-delete-outline
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
       <update-sub-category 
      :dialog="dialog"
      :subCategory="subCategory"
      @changeDialog="changeDialog"
       />
    </v-card>
</template>

<script>

import UpdateSubCategory from '@/components/category/modal/UpdateSubCategory'
import {mapState} from 'vuex'

export default {
    props:{
        subCategories:{
            type:Array
        }
    },
    components:{
      UpdateSubCategory
    },
    computed:{
      ...mapState('Loading',['loading'])
    },
    data() {
      return {
        dialog:false,
        subCategory:{},
        headers: [
          { text: "Name", value: "name",},
          { text: "Myanmar Name", value: "mm_name",},
          { text: "Chinese Name", value: "cn_name",},
          { text: "actions",value:'actions'},
        ],
      };
    },
    methods:{
      showUpdateSubCategory(subCategory){
        this.dialog = !this.dialog
        this.subCategory = subCategory
        console.log(this.subCategory);
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
.header-title{
    font-family: var(--title-font-family) !important;
    letter-spacing: var(--text-spacing);
    font-weight: var(--text-weight);
    font-size: 18px;
    margin: 0px 10px;
    text-transform: uppercase;
}
</style>