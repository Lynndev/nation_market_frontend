<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col md="6">
          <v-select
          v-model="packageId"
          :items="dyanmicPackages"
          item-text="name"
          item-value="id"
          hide-details
          label="choose package"
          solo
        />
        </v-col>
        <v-col md="6">
          <v-select
          v-model="id"
          :items="shopsOrMembers"
          item-text="name"
          item-value="id"
          hide-details
          label="choose..."
          solo
        />
        </v-col>
      </v-row>
    
 
    </v-card-text>
    <v-card-actions class="pl-4">
      <v-btn
        @click.prevent="storePackagePurchase"
        type="submit"
        class="submit-btn"
      >
        <v-icon small left>mdi-checkbox-marked-circle-outline</v-icon>Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: {
    dyanmicPackages: {
      type: Array,
    },
    mainCategoryId:{
        type:Number
    }
  },
  data(){
      return{
          packageId:null,
          id:null
      }
  },
  methods:{
      storePackagePurchase(){
          let data ={
              package_id:this.packageId
          }
          if(this.mainCategoryId == 1){
            data.shop_id = this.id
            this.$store.dispatch('PackagePurchase/storeShopPurchase',data)
          }else if(this.mainCategoryId == 2){
            data.member_id = this.id
            this.$store.dispatch('PackagePurchase/storeMarketPurchase',data) 
          }else{ 
            data.member_package_id = this.id
            this.$store.dispatch('PackagePurchase/storeMemberPurchase',data) 
          }
        this.packageId = null
        this.id = null
      },
      
  },
  computed:{
      ...mapState('Member',['members']),
      ...mapState('Shop',['shops']),
      shopsOrMembers(){
        if(this.mainCategoryId == 2 || this.mainCategoryId == 3){
            return this.members
        }else{
            return this.shops
        }
      }
  },
  mounted(){
    this.$store.dispatch('Member/getMembers')

    this.$store.dispatch('Shop/getShops')
  }
};
</script>
