<template>
      <v-container>
        <v-row
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="card-drop-shadow">
              <v-toolbar
                class="login-toolbar"
                dark
                flat
              >
                <v-toolbar-title class="login-toolbar-title">
                  <v-icon>mdi-account-check-outline</v-icon>
                  Login form
                </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <div v-if="loginInfoError">
                <p class="red--text font-weight-light text-center" >Name and Password must be valid</p>
              </div>
              <form @submit.prevent="login">
              <v-card-text>
                  <label>Name</label>
                  <v-text-field
                    v-model.trim="name"
                    :error-messages="nameErrors"
                    type="text"
                    outlined
                    dense
                  ></v-text-field>
                  <label>Password</label>
                  <v-text-field
                    v-model.trim="password"
                    :error-messages="PasswordErrors"
                    type="password"
                    outlined
                    dense
                  ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :loading="loading" large type="submit" class="submit-btn">
                   <v-icon left>mdi-chevron-right-circle-outline</v-icon>
                  Login
                </v-btn>
              </v-card-actions>
              </form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>

import {required} from 'vuelidate/lib/validators'
import {mapState} from 'vuex'


export default {
    data(){
        return{
            name:'',
            password:''
        }
    },
    validations:{
      name:{
        required,
      },
      password:{
        required
      }
    },
    computed:{
      ...mapState('User',['loginInfoError']),
      ...mapState('Loading',['loading']),
       nameErrors(){
        const errors = []
        if (!this.$v.name.$dirty) return errors

        if(!this.$v.name.required){
          errors.push('Name is required')
        }
        return errors
       },
       PasswordErrors(){
        const errors = []
        if(!this.$v.password.$dirty) return errors

        if(!this.$v.password.required){
          errors.push('Password is required')
        }
        return errors
      },
    },
    methods:{
        login(){
          this.$v.$touch()
          if(!this.$v.$invalid){
             let data = {
              name:this.name,
              password:this.password
            }
          this.$store.dispatch('User/login',data)
        }
    }
  }
}
</script>

<style scoped>
  .login-toolbar{
    background-image: linear-gradient(60deg, rgb(236, 64, 122), rgb(216, 27, 96));
  }
  .login-toolbar-title{
    font-weight:  var(--text-weight) !important;
    font-family: var(--title-font-family);
    letter-spacing: var(--text-spacing);
    text-transform: uppercase;
  }
  .card-drop-shadow{  
    box-shadow: 0 0 2rem 0 rgba(136,152,170,0.25) !important;
  }
</style>