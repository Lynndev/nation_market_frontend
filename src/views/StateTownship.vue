<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="4">
          <state-store />
      </v-col>
      <v-col md="4">
       <township-store :state="state"/>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col md="4">
          <state-list 
          :states="states"
          @getTownshipsByStateId="getTownshipsByStateId" />
      </v-col>
       <v-col md="4">
         <township-list 
          :townships="townships"
         />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import {mapState} from 'vuex'

import StateStore from '@/components/state/StateStore'
import StateList from '@/components/state/StateList'
import TownshipList from '@/components/township/TownshipList'
import TownshipStore from '@/components/township/TownshipStore'

export default {
  data(){
    return{
      state:{}
    }
  },
  computed:{
    ...mapState('States',['states']),
    ...mapState('Township',['townships']),
  },
  
  components:{
      StateStore,
      StateList,
      TownshipList,
      TownshipStore
  },
  methods:{
    getCategoriesByMainId(mainId){
      this.$store.dispatch('Category/getCategoriesByMainId',mainId)
    },
    getTownshipsByStateId(state){
      this.state = state
      this.$store.dispatch('Township/getTownshipByStateId',state.id)
    },
    reCheckCategoriesByMainId(mainId){
      this.getCategoriesByMainId(mainId)
    },
    reCheckSubCategoriesByCatId(catId){
      this.getSubCategoriesByCatId(catId)
    }
  },

  created(){
    this.$store.dispatch('States/getStates')
  }
};
</script>

<style scoped>
   
</style>
