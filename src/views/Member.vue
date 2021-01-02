<template>
  <v-container fluid>
    <v-row >
      <v-col md="12">
         <member-list :members="members"></member-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MemberList from '@/components/member/MemberList'

import {mapState} from 'vuex'

export default {
  computed:{
    ...mapState('Member',['members'])
  },
  components:{
    MemberList,

  },
  methods: {
    getData(){
      if (this.$route.query.mark)
      {
        this.$store.dispatch('Member/getMarkMembers')
      }
      else {
        this.$store.dispatch('Member/getMembers')
      }
      
    }
  },
  created(){
      this.getData();
  },
  watch : {
    $route()
    {
      this.getData();
    }
  }
};
</script>

<style scoped>
.member-card{
  width: 600px;
}
</style>
