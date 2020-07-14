<template>
     <v-card>
        <div class="d-flex align-baseline flex-row header">
          <div>
             <h2 class="header-title">State Table</h2>
          </div>
        </div>
        <v-data-table
        :headers="headers"
        :loading="loading"
        :items="states"
        :items-per-page="15"
        >
        <template v-slot:item.name="{ item }" >
          <span 
          class="link-click" 
          :class="{'link-click-active':activeId == item.id}" 
          @click="getTownshipsByStateId(item)">
          {{item.name}}</span>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn @click="showUpdateState(item)" color="grey darken-1" class="white--text" depressed>
            <v-icon small >
              mdi-pencil-outline
            </v-icon>
           <v-icon small >
              mdi-delete-outline
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <update-state 
      :dialog="dialog"
      :state="state"
      @changeDialog="changeDialog"
       />
    </v-card>
</template>

<script>

import UpdateState from '@/components/state/modal/UpdateState'
import {mapState} from 'vuex'

export default {
    props:{
        states:{
            type:Array
        },
    },
    components:{
      UpdateState
    },

    data() {
      return {
        dialog:false,
        state:{},
        activeId:0,
        headers: [
          { text: "State Name", value: "name",},
          { text: "actions",value:'actions'},
        ],
    };
  },
  computed:{
    ...mapState('Loading',['loading'])
  },
  methods:{
    getCategoriesByMainId(id){
      this.$emit('getCategoriesByMainId',id)
    },
    getTownshipsByStateId(state){
      this.activeId = state.id
      this.$emit('getTownshipsByStateId',state)
    },
    showUpdateState(state){
      this.dialog = !this.dialog
      this.state = state
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