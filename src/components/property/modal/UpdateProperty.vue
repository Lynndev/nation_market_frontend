<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title >
          <span class="headline">Update Sub Category</span>
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
        <label>Category Name</label>
          <v-text-field
            v-model="property.name"
            outlined
            clearable
            dense
          >
          </v-text-field>
          <label>Category Myanmar Name</label>
          <v-text-field
            v-model="property.mm_name"
            outlined
            clearable
            dense
          >
          </v-text-field>
          <label>Category Chinese Name</label>
          <v-text-field
             v-model="property.cn_name"
            outlined
            clearable
            dense
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-1" outlined   @click="changeDialog">Cancel</v-btn>
          <v-btn color="red darken-1" outlined  @click="deleteProperty">Delete</v-btn>
          <v-btn color="orange darken-1" outlined @click="updateProperty">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
    props:{
      property:{
        type:Object,
        required:true,
        default:() => {
          return {
            name:null,
            mm_name:null,
            cn_name:null
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
      deleteProperty(){
        if(this.property.id){
          let data = {
            id:this.property.id,
            category_id:this.property.category_id
          }
          this.$store.dispatch('Property/deleteProperty',data)

          this.property.name = ''
          this.property.mm_name = ''
          this.property.cn_name = ''

          this.changeDialog()
        }
      },
      updateProperty(){
        if(this.property.id){
          let data = {
            name:this.property.name,
            mm_name:this.property.mm_name,
            cn_name:this.property.cn_name,
            id:this.property.id,
            category_id:this.property.category_id
          }

          this.$store.dispatch('Property/updateProperty',data)

          this.property.name = ''
          this.property.mm_name = ''
          this.property.cn_name = ''

          this.changeDialog()
        }
       
      }
    }
}
</script>