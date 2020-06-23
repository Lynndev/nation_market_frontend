<template>
    <v-container fluid>
      <toolbar :routeName="routeName"/>
      <v-row justify="center">
        <v-col md="6">
           <v-card>
            <h2  class="form-title pa-3">Member Store</h2>
             <v-divider></v-divider>
            <v-card-text>
            <v-row justify="center">
              <v-avatar v-if="!member.profile" size="150px" v-ripple  class="grey lighten-3 mb-3">
                <v-icon size="150px">mdi-account-circle</v-icon>
              </v-avatar>
               <v-avatar size="150px" v-ripple v-else class="mb-3">
                <v-img  alt="profile"/>
              </v-avatar>
            </v-row>
           
            <label>Name</label>
            <v-text-field
                v-model="member.name"
                :error-messages="nameErrors"
                outlined
                clearable
                dense>
            </v-text-field>
            <label>Phone</label>
            <v-text-field
                v-model="member.phone"
                :error-messages="phoneErrors"
                outlined
                clearable
                dense>
            </v-text-field>            
            <v-row v-if="member.back_nrc">
              <v-col md="12">
                <p class="text-center">NRC FRONT</p>
                <v-img src="https://picsum.photos/510/300?random" aspect-ratio="2" contain></v-img>
              </v-col>
            </v-row>
             <v-row v-if="member.back_nrc">
              <v-col md="12">
                <p class="text-center">NRC BACK</p>
                <v-img src="https://picsum.photos/510/300?random" aspect-ratio="2" contain></v-img>
              </v-col>
            </v-row>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-if="!member.code" type="submit" @click="storeMember" class="submit-btn">
                <v-icon small left>mdi-checkbox-marked-circle-outline</v-icon>Submit
            </v-btn>
            <template v-else >
               <v-btn type="submit" @click="blockMember" class="submit-btn">
                <v-icon small left>mdi-account-cancel-outline</v-icon>Block this member
              </v-btn>
               <v-btn type="submit" @click="updateMember" class="edit-btn">
                <v-icon small left>mdi-pencil-outline</v-icon>update
              </v-btn>
            </template>
           
            </v-card-actions>
        </v-card>
        </v-col>
      </v-row>
    </v-container>
       
</template>
<script>

import {required} from 'vuelidate/lib/validators'
import Toolbar from '@/components/includes/Toolbar'

export default {
  props:{
    member:{
      type:Object,
      default:() => {
        return {
          name:null,
          phone:null
        }
      }
    }
  },
    data: () => ({
      routeName:'member',
    }),
    validations:{
      member:{
        name:{
          required,
        },
        phone:{
          required
        },
      }
    },
    components:{
      Toolbar
    },
    computed: {
        nameErrors(){
        const errors = []
        if (!this.$v.member.name.$dirty) return errors

        if(!this.$v.member.name.required){
          errors.push('Name is required')
        }
        return errors
       },
        phoneErrors(){
        const errors = []
        if (!this.$v.member.phone.$dirty) return errors

        if(!this.$v.member.phone.required){
          errors.push('Phone is required')
        }
        return errors
       },
    },
    methods: {
      storeMember(){
        this.$v.$touch()
        if(!this.$v.$invalid){
            let data = {
                name:this.member.name,
                phone:this.member.phone,
            }
            this.$store.dispatch('Member/storeMember',data)

            this.member.name = ''
            this.member.phone = ''


            this.$v.$reset()

          }
      },
      blockMember(){
        if(this.member.id){
          this.$store.dispatch('Member/blockMember',this.member.id)
        }
      },
      updateMember(){
        this.$v.$touch()
        if(!this.$v.$invalid){
            let data = {
                id:this.member.id,
                name:this.member.name,
                phone:this.member.phone,
            }
            this.$store.dispatch('Member/updateMember',data)

            this.member.name = ''
            this.member.phone = ''


            this.$v.$reset()

          }
      }
    },
    created(){
      console.log(this.member);
    }
  }
</script>
