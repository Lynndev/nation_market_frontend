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
              <input ref="fileProfile" type="file" style="display:none" @change="onProfileImagePicked">
              <v-avatar @click="clickprofileImage"  size="150px" v-ripple  class="grey lighten-3 mb-3">
                <v-img    
                alt="profile"
                :src="selectProfileImage"
                />
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
            <v-row >
              <v-col md="12">
                <p class="text-center">NRC FRONT</p>
                <input ref="fileNrcFront" type="file" style="display:none" @change="onNrcFrontPicked">
                <div @click="clicktNrcFront">
                  <v-img 
                  :src="selectNrcFront"
                  aspect-ratio="2" 
                  contain>
                  </v-img>
                </div>
              </v-col>
            </v-row>
             <v-row>
              <v-col  md="12">
                <p class="text-center">NRC BACK</p>
                <input ref="fileNrcBack" type="file" style="display:none" @change="onNrcBackPicked">
                <div @click="clicktNrcBack">
                  <v-img 
                  :src="selectNrcBack"
                  aspect-ratio="2" 
                  contain>
                  </v-img>
                </div>
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
import {MemberImageUpload} from '@/mixins/MemberImageUpload'

const defaultImage = require('../assets/nrc.png')

export default {
  mixins:[MemberImageUpload],
  props:{
    member:{
      type:Object,
      default:() => {
        return {
          name:null,
          phone:null,
          profileImage:null,
          nrcFront:null,
          nrcBack:null
        }
      }
    }
  },
    data: () => ({
      defaultImage:defaultImage,
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
      },
    
    },
    created(){
      console.log(this.member);
    }
  }
</script>

<style scoped>
</style>
