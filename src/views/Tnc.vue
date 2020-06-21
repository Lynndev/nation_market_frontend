<template>
  <v-container>
    <v-row justify="center">
      <v-col md="12">
          <tncs-store :tncs="tncs" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TncsStore from '@/components/tnc/TncsStore'

import {mapState} from 'vuex'

export default {
  computed:{
    ...mapState('Tnc',['tncs'])
  },
  components:{
    TncsStore
  },
  created(){
    this.$store.dispatch('Tnc/getTncs')
  }
};
</script>

<style scoped>

</style>
