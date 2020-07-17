<template>
  <v-container fluid>
    <v-btn 
     to="/package/purchase"
     class="edit-btn">
     <v-icon left >mdi-arrow-left-circle-outline</v-icon>
     Purchase
     </v-btn>
    <header class="card-header">
      <ul class="tab-heads">
        <li
          class="tab-head"
          v-for="(mainCategory, index) in mainCategoriesNMember"
          :key="index"
          @click="handleMainCategories(mainCategory.id)"
          v-bind:class="{
            'tab-head--active': mainCategoryId == mainCategory.id,
          }"
        >
          {{ mainCategory.name }}
        </li>
      </ul>
    </header>
    <v-row justify="center">
      <v-col v-show="mainCategoryId != 6" md="6">
         <package-store 
          :mainCategoryId="mainCategoryId"
        />
      </v-col>

      <v-col v-show="mainCategoryId == 6" md="5">
         <package-member-store />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col v-show="mainCategoryId != 6" md="9">
        <package-list 
          :packages="packages" />
      </v-col>

       <v-col v-show="mainCategoryId == 6"  md="8">
        <package-member-list 
          :memberPackages="memberPackages" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapGetters,mapState } from "vuex";
import PackageStore from '@/components/package/PackageStore'
import PackageList from '@/components/package/PackageList'
import PackageMemberStore from '@/components/package/member/PackageMemberStore'
import PackageMemberList from '@/components/package/member/PackageMemberList'

export default {
  data() {
    return {
      mainCategoryId: 1,
      search:''
    };
  },
  components:{
    PackageStore,
    PackageList,
    PackageMemberStore,
    PackageMemberList
  },
  methods: {
    handleMainCategories(mainCategoryId) {
      this.mainCategoryId = mainCategoryId

      if(this.mainCategoryId == 6){
        this.$store.dispatch('Package/getMemberPackages')
      }else{
        this.$store.dispatch('Package/getPackagesByMainId',mainCategoryId)
      }
    
    },
  },
  computed: {
    ...mapState('Loading',['loading']),
    ...mapState('Package',['packages']),
    ...mapState('Package',['memberPackages']),
    ...mapGetters("MainCategory", ["mainCategoriesNMember"]),
  },
  mounted(){
    this.$store.dispatch('Package/getPackagesByMainId',this.mainCategoryId)
  },
  created() {
    this.$store.dispatch("MainCategory/getMainCategories")

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
  margin-bottom: 40px;
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
