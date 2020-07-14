<template>
     <v-card>
        <div class="d-flex align-baseline flex-row header">
          <div>
            <h2 class="header-title">Shop Purchase Table</h2>
            <v-select
              :items="shops"
              class="ml-1"
              item-text="name"
              item-value="id"
              hide-details
              label="choose shop..."
              @change="getPurchaseByShopId"
              solo>
            </v-select>  
          </div>
          <div></div>
         
        </div>
        <v-data-table
        :headers="headers"
        :items="shopPurchases"
        :loading="loading"
        :items-per-page="5"
        >
      </v-data-table>

    </v-card>
</template>

<script>

import {mapState} from 'vuex'

export default {
    components:{
    },
    computed:{
      ...mapState('Loading',['loading']),
      ...mapState('Shop',['shops']),
      ...mapState('PackagePurchase',['shopPurchases'])
    },
    data() {
      return {
        oneCategory:{},
        headers: [
          { text: "Shop Name", value: "shop.name",},
          { text: "Package Name", value: "package.name",},
          { text: "Day Spend", value: "days_left.day_spend",},
          { text: "Duration", value: "days_left.duration",},
          { text: "Price", value: "package.price",},
          { text: "Image Limit", value: "package.image_limit",},
          { text: "Item Limit", value: "package.item_limit",},
          { text: "Payment", value: "payment"},
          { text: "actions",value:'actions'},
        ],
    };
  },
  methods:{
    getPurchaseByShopId(shopId){
      this.$store.dispatch('PackagePurchase/getPurPackagesByShop',shopId)
    },
  },
  created(){
    this.$store.dispatch('Shop/getShops')
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