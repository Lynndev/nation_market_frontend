<template>
  <v-container>
    <v-row justify="center">
      <v-col md="7">
        <v-card>
          <v-card-text>
            <v-flex class="d-flex justify-center">
              <v-icon class="profile-icon" large
                >mdi-account-circle-outline</v-icon
              >
            </v-flex>

            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="text-center"
                  >Admin Name</v-list-item-title
                >
                <v-list-item-subtitle class="text-center">{{
                  adminData.name
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-expansion-panels>
              <v-expansion-panel class="change-password">
                <v-expansion-panel-header class="change-password__header"
                  >Change Password
                  <template v-slot:actions>
                    <v-icon color="fff"
                      >mdi-arrow-down-drop-circle-outline</v-icon
                    >
                  </template>
                </v-expansion-panel-header>
                <v-divider></v-divider>
                <v-expansion-panel-content class="mt-4">
                    <label>Old Password</label>
                    <v-text-field
                        v-model="oldPassword"
                        :error-messages="oldPasswordErrors"
                        outlined
                        clearable
                        dense
                    >
                    </v-text-field>
                    <label>New Password</label>
                    <v-text-field
                        v-model="newPassword"
                         :error-messages="newPasswordErrors"
                        outlined
                        clearable
                        dense
                    >
                    </v-text-field>
                  <v-spacer></v-spacer>
                  <v-btn @click.prevent="changePassword" type="submit" class="submit-btn">
                    <v-icon small left
                      >mdi-checkbox-marked-circle-outline</v-icon
                    >Submit
                  </v-btn>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapState } from "vuex";
import {required} from 'vuelidate/lib/validators'

export default {
    data(){
        return{
            oldPassword:'',
            newPassword:''
        }
    },

     validations:{
      oldPassword:{
        required,
      },
      newPassword:{
        required
      },
    },

    computed: {
      ...mapState("User", ["adminData"]),
      oldPasswordErrors(){
        const errors = []
        if (!this.$v.oldPassword.$dirty) return errors

        if(!this.$v.oldPassword.required){
          errors.push('old password is required')
        }
        return errors
      },
      newPasswordErrors(){
        const errors = []
        if (!this.$v.newPassword.$dirty) return errors

        if(!this.$v.newPassword.required){
          errors.push('new password is required')
        }
        return errors
      },
    },
    methods:{
        changePassword(){
          this.$v.$touch()
          if(!this.$v.$invalid){
            let data = {
                id:this.adminData.id,
                old_password:this.oldPassword,
                new_password:this.newPassword
            }
            this.$store.dispatch('User/changePassword',data)

            this.oldPassword = ''
            this.newPassword = ''

            this.$v.$reset()
          }
        }
    },
    created() {
        this.$store.dispatch("User/getAdminData");
    },
};
</script>

<style scoped>
.profile-icon {
  font-size: 60px !important;
  margin: 10px 0px !important;
}
  .v-expansion-panel:before {
        box-shadow: var(--box-shadow) !important;
    }
    .change-password{
        background-color: var(--background-transparent) !important;
    }
    .change-password__header{
        font-size: 17px;
        color: var(--text-color-primary) !important;
    }
   .theme--light.v-expansion-panels .v-expansion-panel-header .v-expansion-panel-header__icon .v-icon {
    color: var(--text-color-primary) !important;
    }
</style>
