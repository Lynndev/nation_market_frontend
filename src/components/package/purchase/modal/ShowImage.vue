<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title >
          <span class="headline">Show Image</span>
          <v-spacer/>
          <v-icon @click="changeDialog" left>mdi-close</v-icon>
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
            <v-img
            :src="purchase.payment"
            aspect-ratio="1"
            max-width="600"
            max-height="300"
            contain>
            </v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
    props:{
      purchase:{
        type:Object,
        required:true,
      },
      dialog:{
        type:Boolean
      },
    },
    data(){
      return{
      }
    },
    components:{
    },
    methods:{
      changeDialog(){
        this.$emit('changeDialog')
      },
    }
}
</script>