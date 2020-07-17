<template>
     <v-card>
        <div class="d-flex align-baseline flex-row header">
          <div>
            <h2 class="header-title">Market Purchase Table</h2>
            <v-select
              :items="members"
              class="ml-1"
              item-text="name"
              item-value="id"
              hide-details
              label="choose member..."
              @change="getPurchaseByMemberId"
              solo>
            </v-select>  
          </div>
          <div></div>
         
        </div>
        <v-data-table
        :headers="headers"
        :items="marketPurchases"
        :loading="loading"
        :items-per-page="5"
        >
        <template v-slot:item.payment="{ item }">
          <v-img
           @click="showImage(item)"
           :src="item.payment" 
           width="50px"
           height="50px"
           contain>
          </v-img>
        </template>
      </v-data-table>
      <show-image 
      :dialog="dialog"
      :purchase="purchase"
      @changeDialog="changeDialog"
       />
    </v-card>
</template>

<script>

import {mapState} from 'vuex'
import ShowImage from '@/components/package/purchase/modal/ShowImage.vue'

export default {
    components:{
      ShowImage
    },
    computed:{
      ...mapState('Loading',['loading']),
      ...mapState('Member',['members']),
      ...mapState('PackagePurchase',['marketPurchases'])
    },
    data() {
      return {
        purchase:{},
        dialog:false,
        headers: [
          { text: "Shop Name", value: "member.name",},
          { text: "Package Name", value: "package.name",},
          { text: "Day Spend", value: "days_left.day_spend",},
          { text: "Duration", value: "days_left.duration",},
          { text: "Price", value: "package.price",},
          { text: "Payment", value: "payment"},
          { text: "actions",value:'actions'},
        ],
    };
  },
  methods:{
    getPurchaseByMemberId(memberId){
      this.$store.dispatch('PackagePurchase/getPurPackagesByMarket',memberId)
    },
    showImage(purchase){
      this.dialog = !this.dialog
      this.purchase = purchase
    },
    changeDialog(){
      this.dialog = !this.dialog
    }
  },
  created(){
    this.$store.dispatch('Member/getMembers')

    this.$store.dispatch('PackagePurchase/getPurPackagesByMarkets')
  }
}
</script>

<style scoped>
.header{
  padding: 15px 0px;

}
.link-click{
  cursor: pointer;
}
.link-click:hover{
  color: #5020ff;
}
.link-click-active{
  color: #5020ff !important;
}
.header-title{
    font-family: var(--title-font-family) !important;
    letter-spacing: var(--text-spacing);
    font-weight: var(--text-weight);
    font-size: 18px;
    margin: 0px 10px;
    text-transform: uppercase;
}
</style>