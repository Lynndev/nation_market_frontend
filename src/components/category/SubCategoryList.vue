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
        :items-per-page="5">
      </v-data-table>
    </v-card>
</template>

<script>


export default {
    props:{
        subCategories:{
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
    // computed:{
    //   ...mapState('SubCategory',['subCategories'])
    // }
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