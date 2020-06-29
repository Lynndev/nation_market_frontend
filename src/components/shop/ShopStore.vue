<template>
  <v-card>
    <v-expansion-panels>
      <v-expansion-panel class="shop-store">
        <v-expansion-panel-header class="shop-store__header">
          Shop Store
          <template v-slot:actions>
            <v-icon color="fff">mdi-arrow-down-drop-circle-outline</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-divider></v-divider>
        <v-expansion-panel-content class="mt-4">
          <label>Categories</label>
          <v-select
            :items="categories"
            :error-messages="categoryErrors"
            v-model="category"
            item-text="name"
            item-value="id"
            label="choose category"
            chips
            solo
            multiple
          >
          </v-select>
           <label>Choose User</label>
           <v-autocomplete
           outlined
            v-model="member"
            :error-messages="memberErrors"
            :items="members"
            item-text="name"
            item-value="id"
            placeholder="Select... User"
          >
          </v-autocomplete>
          <label>Name</label>
          <v-text-field 
            :error-messages="nameErrors"
            outlined 
            clearable
            v-model="name"
            dense> 
          </v-text-field>
          <label>Description</label>
          <v-textarea
            solo
            v-model="description"
             :error-messages="descriptionErrors"
          ></v-textarea>
          <v-spacer></v-spacer>
          <v-btn
            @click.prevent="storeShop"
            type="submit"
            class="submit-btn"
          >
            <v-icon small left>mdi-checkbox-marked-circle-outline</v-icon>Submit
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import {mapState} from 'vuex'
export default {
  props:{
    categories:{
      type:Array
    },
    mainCategoryId:{
      type:Number
    }
  },
  validations:{
    name: {
      required,
    },
    description: {
      required,
    },
    category: {
      required,
    },
    member:{
      required
    }
  },
  data(){
    return{
      category:[],
      name:null,
      description:null,
      member:null
    }
  },
  watch:{
    mainCategoryId(oldValue,newValue){
      if(newValue){
        this.category = []
      }
    }
  },
  methods:{
    storeShop(){
      this.$v.$touch()
      if (!this.$v.$invalid) {
        let data = {
          name:this.name,
          description:this.description,
          category_ids:[],
          member_id:this.member,
          main_category_id:this.mainCategoryId
        }

        this.category.forEach(element => {
          data.category_ids.push(element)
        })
        this.$store.dispatch('Shop/storeShop',data)

        this.name = null,
        this.description = null
        this.member = null
        this.category = null

        this.$v.$reset();
      }
    }
  },
  created(){
    this.$store.dispatch('Member/getMembers')
  },
  computed:{
    ...mapState('Member',['members']),
    nameErrors(){
      const errors = []
      if (!this.$v.name.$dirty) return errors

      if(!this.$v.name.required){
        errors.push('Name is required')
      }
      return errors
    },
    memberErrors(){
      const errors = []
      if (!this.$v.member.$dirty) return errors

      if(!this.$v.member.required){
        errors.push('Member is required')
      }
      return errors
    },
    categoryErrors(){
      const errors = []
      if (!this.$v.category.$dirty) return errors

      if(!this.$v.category.required){
        errors.push('category is required')
      }
      return errors
    },
    descriptionErrors(){
      const errors = []
      if (!this.$v.description.$dirty) return errors

      if(!this.$v.description.required){
        errors.push('description is required')
      }
      return errors
    },
  },
}
</script>


<style scoped>
.v-expansion-panel:before {
  box-shadow: var(--box-shadow) !important;
}
.shop-store {
  background-color: var(--background-transparent) !important;
}
.shop-store__header {
  font-size: 17px;
  color: var(--text-color-primary) !important;
}
.theme--light.v-expansion-panels
  .v-expansion-panel-header
  .v-expansion-panel-header__icon
  .v-icon {
  color: var(--text-color-primary) !important;
}
</style>