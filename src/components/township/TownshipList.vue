<template>
     <v-card>
        <div class="d-flex align-baseline flex-row header">
          <div>
             <h2 class="header-title">Townships Table</h2>
          </div>
        </div>
        <v-data-table
        :headers="headers"
        :items="townships"
        :items-per-page="5">
        <template v-slot:item.actions="{ item }">
          <v-btn 
          @click="showUpdateTownship(item)" 
          color="grey darken-1" 
          class="white--text" 
          depressed>
            <v-icon small >
              mdi-pencil-outline
            </v-icon>
           <v-icon small >
              mdi-delete-outline
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>

       <update-township 
      :dialog="dialog"
      :township="township"
      @changeDialog="changeDialog"
       />
    </v-card>
</template>

<script>

import UpdateTownship from '@/components/township/modal/UpdateTownship'

export default {
    props:{
        townships:{
            type:Array
        }
    },
    components:{
      UpdateTownship
    },
    data() {
      return {
        dialog:false,
        township:{},
        headers: [
          { text: "Township Name", value: "name",},
          { text: "actions",value:'actions'},
        ],
      };
    },
    methods:{
      showUpdateTownship(township){
        this.dialog = !this.dialog
        this.township = township
        console.log(this.township);
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