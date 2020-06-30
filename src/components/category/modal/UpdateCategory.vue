<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title >
          <span class="headline">Update Category</span>
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
        <label>Category Name</label>
          <v-text-field
            v-model="oneCategory.name"
            outlined
            clearable
            dense
          >
          </v-text-field>
          <label>Category Myanmar Name</label>
          <v-text-field
            v-model="oneCategory.mm_name"
            outlined
            clearable
            dense
          >
          </v-text-field>
          <label>Category Chinese Name</label>
          <v-text-field
             v-model="oneCategory.cn_name"
            outlined
            clearable
            dense
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-1" outlined   @click="changeDialog">Cancel</v-btn>
          <v-btn color="red darken-1" outlined  @click="deleteCategory">Delete</v-btn>
          <v-btn color="orange darken-1" outlined @click="updateCategory">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
    props:{
      oneCategory:{
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
      deleteCategory(){
        if(this.oneCategory){
          let data = {
            id:this.oneCategory.id,
            main_category_id:this.oneCategory.main_category_id
          }
          this.$store.dispatch('Category/deleteCategory',data)

          this.oneCategory.name = ''
          this.oneCategory.mm_name = ''
          this.oneCategory.cn_name = ''

          this.changeDialog()
        }
      },
      updateCategory(){
        let data = {
          name:this.oneCategory.name,
          mm_name:this.oneCategory.mm_name,
          cn_name:this.oneCategory.cn_name,
          id:this.oneCategory.id,
          main_category_id:this.oneCategory.main_category_id
        }

        this.$store.dispatch('Category/updateCategory',data)

        this.oneCategory.name = ''
        this.oneCategory.mm_name = ''
        this.oneCategory.cn_name = ''

        this.changeDialog()
      }
    }
}
</script>