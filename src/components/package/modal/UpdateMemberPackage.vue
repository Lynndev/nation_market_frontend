<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title >
          <span class="headline">Update Package</span>
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
         <v-row>
            <v-col md="8">
              <label>Package Name</label>
              <v-text-field v-model="onePackage.name" outlined clearable dense>
              </v-text-field>
            </v-col>
            <v-col>
              <label>Duration</label>
              <v-text-field
                v-model="onePackage.duration"
                type="number"
                outlined
                clearable
                dense
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col md="4">
              <label>Price</label>
              <v-text-field
                v-model="onePackage.price"
                type="number"
                outlined
                clearable
                dense
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-1" outlined   @click="changeDialog">Cancel</v-btn>
          <v-btn color="red darken-1" outlined  @click="deletePackage">Delete</v-btn>
          <v-btn color="orange darken-1" outlined @click="updatePackage">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
    props:{
      onePackage:{
        type:Object,
        required:true,
        default:() => {
          return {
            name: "",
            price: null,
            duration:null
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
      deletePackage(){
        
        this.$store.dispatch('Package/deleteMemberPackage',{id:this.onePackage.id})
          
          this.onePackage.name = ''
          this.onePackage.price = ''
          this.onePackage.duration = ''

          this.changeDialog()

      },
      updatePackage(){
        let data = {
          id:this.onePackage.id,
          main_category_id: this.onePackage.main_category_id,
          duration:this.onePackage.duration,
          name: this.onePackage.name,
          price: this.onePackage.price,
        };
          this.$store.dispatch('Package/updateMemberPackage',data)

        this.onePackage.name = ''
        this.onePackage.price = ''
        this.onePackage.duration = ''

        this.changeDialog()
      }
    }
}
</script>