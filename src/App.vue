<template>
  <v-app id="main">
    <SnackBar/>
    <side-nav :drawer="drawer" v-if="isLoggedIn"/>
    
    <v-content>
       <v-app-bar
       v-if="isLoggedIn"
        class="app-bar"
        app
        dense
        elevation="0"
        >
      <v-icon @click.stop="drawer = !drawer">mdi-backburger</v-icon>
    </v-app-bar>
      <transition name="slide-fade" mode="out-in">
        <!-- <v-row>
          <v-col @click="drawer = !drawer">
            <v-icon>mdi-backburger</v-icon>
          </v-col>
        </v-row> -->
        <router-view/>
      </transition>
    </v-content>
    
  </v-app>
</template>

<script>

import SnackBar from '@/components/includes/SnackBar'
import SideNav from "@/components/includes/SideNav.vue";
import {mapState} from 'vuex'

export default {
  name: 'App',

  components:{
    SideNav,
    SnackBar,
  },
  computed:{
    ...mapState('User',['isLoggedIn'])
  },
  data: () => ({
    drawer:true
  }),
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Merriweather+Sans:wght@300&display=swap');
:root{
    --text-color-primary:#3a3a3a;
    --text-weight:  300;
    --text-size:16px;
    --text-spacing:1px;
    --btn-radius:25px;
    --title-font-family:'Merriweather Sans', sans-serif;
    --border-color:thin solid rgba(241, 225, 225, 0.62);
    --background-transparent:#fff;
    --box-shadow:0 0 2rem 0 rgba(136,152,170,.15);
}
a{
  color:#ffffff !important;
}
#main{
    /* background-image: linear-gradient(to top, #ae8135, #bc8d3b, #cb9941, #d9a547, #e8b24d); */
  background-color: #F7F8FD;
}
/*** v-app-bar ***/
.app-bar{
  background-color: var(--background-transparent) !important;
  
  border: none !important;
}
/*** TRANSITIONS ***/
/*** Fade TRANSITIONS ***/
.fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-leave-to {
  opacity: 0;
}
/*** Slide Fade TRANSITIONS ***/
.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

.slide-up-enter {
  transform: translateY(10px);
  opacity: 0;
}

.slide-up-enter-active {
  transition: all 0.2s ease;
}

.slide-up-move {
  transition: transform 0.8s ease-in;
}

/***  vuetify form ***/
label{
  color:var(--text-color-primary);
  font-size: var(--text-size);
}
.form-title{
  font-weight: var(--text-weight);
  font-family: var(--title-font-family);
}
.theme--light.v-input, .theme--light.v-input input, .theme--light.v-input textarea {
    color: var(--text-color-primary) !important;
    margin-top: 6px !important;
}
.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)>.v-input__control>.v-input__slot fieldset {
    color: var(--text-color-primary) !important;
}
.theme--light.v-text-field--filled>.v-input__control>.v-input__slot {
    background: rgba(255, 255, 255, 0) !important;
}
.submit-btn{
  box-shadow: 0 12px 20px -10px rgba(233,30,99,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(233,30,99,.2) !important;
  background-image: linear-gradient(60deg, rgb(236, 64, 122), rgb(216, 27, 96));
  color: #fff !important;
  margin-bottom: 10px !important;
}
.goback-btn{
  box-shadow: 0 12px 20px -10px rgba(7, 229, 245, 0.317), 0 4px 20px 0 rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(12, 202, 245, 0.297) !important;
  background-color: #12CDEF !important;
  color: #fff !important;
  border-radius: var(--btn-radius) !important;
}
.edit-btn{
  box-shadow: 0 12px 20px -10px rgba(255, 200, 3, 0.816), 0 4px 20px 0 rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(12, 202, 245, 0.297) !important;
  background-color: #ffc903 !important;
  color: #fff !important;
  margin-bottom: 10px !important;
}
/***  vuetify card ***/
.theme--light.v-card {
    background-color: var(--background-transparent) !important;
    color: var(--text-color-primary) !important;
    box-shadow: var(--box-shadow) !important;
}


/***  data table ***/
.theme--light.v-data-table {
    background-color: transparent !important; 
    color:var(--text-color-primary) !important;
}
.v-data-table td {
    font-size: 1em;
}
.theme--light.v-data-table tbody tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background: #ccc9c940 !important;
}
.theme--light.v-data-table tbody tr:not(:last-child) td:last-child, .theme--light.v-data-table tbody tr:not(:last-child) td:not(.v-data-table__mobile-row), .theme--light.v-data-table tbody tr:not(:last-child) th:last-child, .theme--light.v-data-table tbody tr:not(:last-child) th:not(.v-data-table__mobile-row) {
    border-bottom: var(--border-color) !important;
}
.theme--light.v-data-table thead tr:last-child th {
    border-bottom: #F7F8FD !important;
}
.theme--light.v-data-table .v-data-footer {
    border-top: var(--border-color) !important;
}

.theme--light.v-data-table thead tr th {
    color:var(--text-color-primary) !important;
    font-weight: var(--text-weight);
    background-color: rgba(169, 169, 169, 0.5215686274509804);
    font-size: .95em;
}
.theme--light.v-select .v-select__selection--comma {
    color: var(--text-color-primary) !important;
}

/*** it belongs data table and form autocomplete ***/
.theme--light.v-list {
    background: rgb(237, 224, 197) !important;
}
</style>
