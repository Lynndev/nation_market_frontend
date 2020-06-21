<template>
  <v-card>
    <v-expansion-panels>
      <v-expansion-panel class="category-store">
        <v-expansion-panel-header class="category-store__header">
          Sub Category Store
          <template v-slot:actions>
            <v-icon color="fff">mdi-arrow-down-drop-circle-outline</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-divider></v-divider>
        <v-expansion-panel-content class="mt-4">
          <label>Categories</label>
          <v-select
            :items="categories"
            item-text="name"
            item-value="id"
            v-model="categoryId"
            :error-messages="categoryIdErrors"
            label="choose category"
            solo
          >
          </v-select>
          <label>Sub Category Name</label>
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            outlined
            clearable
            dense
          >
          </v-text-field>
          <label>Sub Category Myanmar Name</label>
          <v-text-field
            v-model="mmName"
            :error-messages="mmNameErrors"
            outlined
            clearable
            dense
          >
          </v-text-field>
          <label>Sub Category Chinese Name</label>
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
            @click.prevent="storeSubCategory"
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
import { CategoryStore } from "@/mixins/CategoryStore";

export default {
  mixins: [CategoryStore],
  props: {
    categories: {
      type: Array,
    },
  },
  data() {
    return {
      categoryId: null,
      name: "",
      mmName: "",
      cnName: "",
    };
  },
  computed: {
    categoryIdErrors() {
      const errors = [];
      if (!this.$v.categoryId.$dirty) return errors;

      if (!this.$v.categoryId.required) {
        errors.push("need to choose category");
      }
      return errors;
    },
  },
  validations: {
    categoryId: {
      required,
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
    storeSubCategory() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = {
          category_id: this.categoryId,
          name: this.name,
          mm_name: this.mmName,
          cn_name: this.cnName,
        };

        this.$store.dispatch("SubCategory/storeSubCategory", data);

        this.categoryId = null;
        this.name = "";
        this.mmName = "";
        this.cnName = "";

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
  background-color: rgba(160, 148, 157, 0.69) !important;
  border-radius: 15px;
  color: #fff;
  box-shadow: var(--box-shadow) !important;
}
.main-category-btn-active {
  background-color: rgba(215, 143, 197, 0.69) !important;
  border-radius: 15px;
  color: #fff;
  box-shadow: var(--box-shadow) !important;
}
</style>
