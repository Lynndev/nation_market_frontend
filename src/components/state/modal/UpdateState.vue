<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card>
        <v-card-title >
          <span class="headline">Update State</span>
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <label>State Name</label>
          <v-text-field
            v-model="state.name"
            outlined
            clearable
            dense
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-1" outlined   @click="changeDialog">Cancel</v-btn>
          <v-btn color="red darken-1" outlined  @click="deleteState">Delete</v-btn>
          <v-btn color="orange darken-1" outlined @click="updateState">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
    props:{
      state:{
        type:Object,
        required:true,
        default:() => {
          return {
            name:null,
          }
        }
      },
      dialog:{
        type:Boolean
      },
    },
    data(){
      return{
        deleteStatus:false
      }
    },
    components:{
    },
    methods:{
      changeDialog(){
        this.$emit('changeDialog')
      },
      deleteState(){
        if(this.state){
          let data = {
            id:this.state.id,
          }
          this.$store.dispatch('States/deleteState',data)

          this.state.name = ''

          this.changeDialog()
        }
      },
      updateState(){
        let data = {
          name:this.state.name,
          id:this.state.id,
        }

        this.$store.dispatch('States/updateState',data)

        this.state.name = ''

        this.changeDialog()
      }
    }
}
</script>