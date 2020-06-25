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
            v-model="subCategory.name"
            outlined
            clearable
            dense
          >
          </v-text-field>
          <label>Category Myanmar Name</label>
          <v-text-field
            v-model="subCategory.mm_name"
            outlined
            clearable
            dense
          >
          </v-text-field>
          <label>Category Chinese Name</label>
          <v-text-field
             v-model="subCategory.cn_name"
            outlined
            clearable
            dense
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-1" outlined   @click="changeDialog">Cancel</v-btn>
          <v-btn color="red darken-1" outlined  @click="deleteSubCategory">Delete</v-btn>
          <v-btn color="orange darken-1" outlined @click="updateSubCategory">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
    props:{
      subCategory:{
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
      deleteSubCategory(){
        if(this.subCategory.id){
          let data = {
            id:this.subCategory.id
          }
          this.$store.dispatch('SubCategory/deleteSubCategory',data)

          this.subCategory.name = ''
          this.subCategory.mm_name = ''
          this.subCategory.cn_name = ''

          this.changeDialog()
        }
      },
      updateSubCategory(){
        if(this.subCategory.id){
          let data = {
            name:this.subCategory.name,
            mm_name:this.subCategory.mm_name,
            cn_name:this.subCategory.cn_name,
            id:this.subCategory.id,
            category_id:this.subCategory.category_id
          }

          this.$store.dispatch('SubCategory/updateSubCategory',data)

          this.subCategory.name = ''
          this.subCategory.mm_name = ''
          this.subCategory.cn_name = ''

          this.changeDialog()
        }
       
      }
    }
}
</script>