<template>
  <v-card>
    <v-expansion-panels>
      <v-expansion-panel class="category-store">
        <v-expansion-panel-header class="category-store__header">
          Category Store
          <template v-slot:actions>
            <v-icon color="fff">mdi-arrow-down-drop-circle-outline</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-divider></v-divider>
        <v-expansion-panel-content class="mt-4">
          <h2 class="main-category-title ma-2">Main Categories</h2>
          <div class="mb-4">
            <v-btn
              outlined
              class="main-category-btn ma-1 "
              v-for="mainCategory in mainCategories"
              :key="mainCategory.id"
              :class="{
                'main-category-btn-active': mainCategory.id == mainCategoryId,
              }"
              @click="showCategoriesByMainId(mainCategory.id)"
            >
              {{ mainCategory.name }}
            </v-btn>
            <p 
            class="maincat-error-text text-center" 
            v-if="mainCatError">{{mainCatError}}</p>
          </div>

          <label>Category Name</label>
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            outlined
            clearable
            dense
          >
          </v-text-field>
          <label>Category Myanmar Name</label>
          <v-text-field
            v-model="mmName"
            :error-messages="mmNameErrors"
            outlined
            clearable
            dense
          >
          </v-text-field>
          <label>Category Chinese Name</label>
          <v-text-field
            v-model="cnName"
            :error-messages="cnNameErrors"
            outlined
            clearable
            dense
          >
          </v-text-field>
          <v-spacer></v-spacer>
          <v-btn
            @click.prevent="storeCategory"
            type="submit"
            class="submit-btn"
          >
            <v-icon small left>mdi-checkbox-marked-circle-outline</v-icon>Submit
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import {CategoryStore} from '@/mixins/CategoryStore'

export default {
  mixins: [CategoryStore],
  props: {
    mainCategories: {
      type: Array,
    },
  },
  data() {
    return {
      mainCategoryId: null,
      mainCatError:null,
      name: "",
      mmName: "",
      cnName: "",
    };
  },
  validations: {
    mainCategoryId:{
      required
    },
    name: {
      required,
    },
    mmName: {
      required,
    },
    cnName: {
      required,
    },
  },
  methods: {
    showCategoriesByMainId(mainCategoryId) {
      this.mainCategoryId = mainCategoryId;
    },
    storeCategory() {
      this.$v.$touch();
      if (!this.$v.mainCategoryId.required) {
        this.mainCatError = 'need to choose main category'
      }
      if (!this.$v.$invalid) {
        let data = {
          main_category_id: this.mainCategoryId,
          name: this.name,
          mm_name: this.mmName,
          cn_name: this.cnName,
        };
        this.$store.dispatch("Category/storeCategory", data);

        this.name = "";
        this.mmName = "";
        this.cnName = "";
        this.mainCatError = null
        
        this.$v.$reset();
      }
    },
  },
};
</script>

<style scoped>
.v-expansion-panel:before {
  box-shadow: var(--box-shadow) !important;
}
.category-store {
  background-color: var(--background-transparent) !important;
}
.category-store__header {
  font-size: 17px;
  color: var(--text-color-primary) !important;
}
.theme--light.v-expansion-panels
  .v-expansion-panel-header
  .v-expansion-panel-header__icon
  .v-icon {
  color: var(--text-color-primary) !important;
}
.main-category-title {
  color: var(--text-color-primary) !important;
  font-weight: var(--text-weight) !important;
}
.main-category-btn {
  border-radius: 15px;
  color: var(--text-color-primary);
  box-shadow: var(--box-shadow) !important;
}
.maincat-error-text{
  color: #f43434;
  font-size: 12px;
}
.main-category-btn-active {
  background-color: rgba(215, 143, 197, 0.69) !important;
  border-radius: 15px;
  color: #fff;
  box-shadow: var(--box-shadow) !important;
}
</style>
