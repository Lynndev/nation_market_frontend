<template>
  <v-container fluid>
    <toolbar :routeName="routeName"/>
    <header class="card-header">
      <ul class="tab-heads">
        <li
          class="tab-head"
          v-for="(mainCategory, index) in purchaseMainCats"
          :key="index"
          @click="handleActiveTab(mainCategory.id)"
          v-bind:class="{
            'tab-head--active': mainCategoryId == mainCategory.id,
          }"
        >
          {{ mainCategory.name }}
        </li>
      </ul>
    </header>
    <v-row>
        <v-col md="8">
            <package-purchase-store 
            :dyanmicPackages="dyanmicPackages"
            :mainCategoryId="mainCategoryId"
            />
        </v-col>
    </v-row>
    <v-row>
        <v-col  md="12">
            <shop-purchase-list v-if="mainCategoryId == 1"/>
            <market-purchase-list v-if="mainCategoryId == 2"/>
            <member-purchase-list v-if="mainCategoryId == 3"/>
        </v-col>
    </v-row>
    
  </v-container>
</template>

<script>

import { mapState } from "vuex";
import Toolbar from '@/components/includes/Toolbar'
import PackagePurchaseStore from '@/components/package/purchase/PackagePurchaseStore'
import ShopPurchaseList from '@/components/package/purchase/ShopPurchaseList'
import MemberPurchaseList from '@/components/package/purchase/MemberPurchaseList'
import MarketPurchaseList from '@/components/package/purchase/MarketPurchaseList'

export default {
  data() {
    return {
      routeName:'package',
      mainCategoryId: 1,
      purchaseMainCats:[    
          {id:1,name:'Shop'},
          {id:2,name:'Market'},
          {id:3,name:'Member'}
      ]
    };
  },
  components:{
    Toolbar,
    PackagePurchaseStore,
    ShopPurchaseList,
    MemberPurchaseList,
    MarketPurchaseList
  },
  methods: {
    handleActiveTab(mainCategoryId) {
      this.mainCategoryId = mainCategoryId
        if(this.mainCategoryId == 3){
        this.$store.dispatch('Package/getMemberPackages')
      }else{
        this.$store.dispatch('Package/getPackagesByMainId',this.mainCategoryId)
      }
    },
  },
  computed: {
    ...mapState('Loading',['loading']),
    ...mapState('Package',['packages']),
    ...mapState('Package',['memberPackages']),
    dyanmicPackages(){
        if(this.mainCategoryId == 3){
            return this.memberPackages
        }
        return this.packages
    }
  },
  mounted(){
    this.$store.dispatch('Package/getPackagesByMainId',this.mainCategoryId)
  },
  created() {

  },
};
</script>

<style scoped>
.card-header {
  background-color: rgba(181, 181, 177, 0.82);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  color: #fff;
  padding: 6px 8px 0;
  border-radius: 4px;
  letter-spacing: 3px;
  margin-top: 10px;
  margin-bottom: 30px;
}
.tab-heads {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  margin-left: 6px;
  margin-top: -4px;
}

.tab-head {
  padding: 10px 18px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  position: relative;
  cursor: pointer;
}

.tab-head--active {
  background-color: #f7f8fd;
  color: var(--text-color-primary);
  transition: 0.5s;
}
 .v-text-field{
        padding-top: 0px !important;
    }
</style>
