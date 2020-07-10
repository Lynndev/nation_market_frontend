<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card>
        <v-card-title >
          <span class="headline">Update Township</span>
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <label>Township Name</label>
          <v-text-field
            v-model="township.name"
            outlined
            clearable
            dense
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-1" outlined   @click="changeDialog">Cancel</v-btn>
          <v-btn color="red darken-1" outlined  @click="deleteTownship">Delete</v-btn>
          <v-btn color="orange darken-1" outlined @click="updateTownship">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
    props:{
      township:{
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
    methods:{
      changeDialog(){
        this.$emit('changeDialog')
      },
      deleteTownship(){
        if(this.township){
          let data = {
            id:this.township.id,
            state_id:this.township.state_id
          }
          this.$store.dispatch('Township/deleteTownship',data)

          this.township.name = ''

          this.changeDialog()
        }
      },
      updateTownship(){
        let data = {
          name:this.township.name,
          id:this.township.id,
          state_id:this.township.state_id
        }

        this.$store.dispatch('Township/updateTownship',data)

        this.township.name = ''

        this.changeDialog()
      }
    }
}
</script>