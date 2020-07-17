<template>
  <v-card>
    <v-expansion-panels>
      <v-expansion-panel class="package-store">
        <v-expansion-panel-header class="package-store__header">
          Package Store
          <template v-slot:actions>
            <v-icon color="fff">mdi-arrow-down-drop-circle-outline</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-divider></v-divider>
        <v-expansion-panel-content class="mt-4">
          <v-row>
            <v-col md="8">
              <label>Package Name</label>
              <v-text-field v-model="name" outlined clearable dense>
              </v-text-field>
            </v-col>
            <v-col>
              <label>Duration</label>
              <v-text-field
                v-model="duration"
                type="number"
                outlined
                clearable
                dense
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col md="4">
              <label>Price</label>
              <v-text-field
                v-model="price"
                type="number"
                outlined
                clearable
                dense
              />
            </v-col>
            <v-col md="4">
              <label>Item Limit</label>
              <v-text-field
                v-model="itemLimit"
                type="number"
                outlined
                clearable
                dense
              />
            </v-col>
            <v-col md="4">
              <label>Image Limit</label>
              <v-text-field
                v-model="imageLimit"
                type="number"
                outlined
                clearable
                dense
              />
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
          <v-btn @click.prevent="storePackage" type="submit" class="submit-btn">
            <v-icon small left>mdi-checkbox-marked-circle-outline</v-icon>Submit
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  props: {
   mainCategoryId:{
     type:Number
   }
  },
  data() {
    return {
      name: "",
      price: null,
      itemLimit: null,
      imageLimit: null,
      duration:null
    };
  },
  validations: {
    name: {
      required,
    },
    price: {
      required,
    },
    itemLimit: {
      required,
    },
    imageLimit: {
      required,
    },
    duration:{
      required
    }
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;

      if (!this.$v.name.required) {
        errors.push("Name is required");
      }
      return errors;
    },
    priceErrors() {
      const errors = [];
      if (!this.$v.price.$dirty) return errors;

      if (!this.$v.price.required) {
        errors.push("price is required");
      }
      return errors;
    },
    itemErrors() {
      const errors = [];
      if (!this.$v.itemLimit.$dirty) return errors;

      if (!this.$v.itemLimit.required) {
        errors.push("item Limit is required");
      }
      return errors;
    },
    imageErrors() {
      const errors = [];
      if (!this.$v.imageLimit.$dirty) return errors;

      if (!this.$v.imageLimit.required) {
        errors.push("image Limit is required");
      }
      return errors;
    },
  },
  methods: {
    showCategoriesByMainId(mainCategoryId) {
      this.mainCategoryId = mainCategoryId;
    },
    storePackage() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = {
          main_category_id: this.mainCategoryId,
          duration:this.duration,
          name: this.name,
          price: this.price,
          item_limit: this.itemLimit,
          image_limit: this.imageLimit,
        };
        this.$store.dispatch("Package/storePackage", data);
        
        this.name = ""
        this.price = ""
        this.itemLimit = ""
        this.duration = ''
        this.imageLimit = ""

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
.package-store {
  background-color: var(--background-transparent) !important;
}
.package-store__header {
  font-size: 17px;
  color: var(--text-color-primary) !important;
}
.theme--light.v-expansion-panels
  .v-expansion-panel-header
  .v-expansion-panel-header__icon
  .v-icon {
  color: var(--text-color-primary) !important;
}

</style>
