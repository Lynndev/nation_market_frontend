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
        :items-per-page="5"
        @click:row="getSubCategoriesByCatId"
        >
      </v-data-table>
    </v-card>
</template>

<script>

export default {
    props:{
        categories:{
            type:Array
        },
        mainCategories:{
            type:Array
        }
    },
    data() {
    return {
      headers: [
        { text: "Name", value: "name",align:'center'},
        { text: "Myanmar Name", value: "mm_name",align:'center'},
        { text: "Chinese Name", value: "cn_name",align:'center'},
      ],
    };
  },
  methods:{
    getCategoriesByMainId(id){
      this.$emit('getCategoriesByMainId',id)
    },
    getSubCategoriesByCatId(category){
      this.$emit('getSubCategoriesByCatId',category.id)
      // this.$store.dispatch('SubCategory/getSubCategoriesByCatId',category.id)
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