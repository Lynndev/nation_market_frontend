<template>
  <v-container fluid>
    <toolbar :routeName="routeName" />
    <v-row justify="center">
      <v-col md="6">
        <v-card>
          <div class="d-flex align-baseline flex-row header">
            <div>
              <h2 class="header-title">Category Table</h2>
              <v-select
                :items="mainCategories"
                class="ml-1"
                item-text="name"
                item-value="id"
                hide-details
                label="choose main category"
                @change="getCategoriesByMainId"
                solo
              >
              </v-select>
            </div>
            <div></div>
          </div>
          <v-data-table
            :headers="headers"
            :items="categories"
            :items-per-page="5"
          >
            <template v-slot:item.name="{ item }">
              <span
                class="link-click"
                :class="{ 'link-click-active': activeId == item.id }"
                @click="getPropertiesByCatId(item)"
                >{{ item.name }}</span
              >
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col md="6">
        <property-store :categories="categories" />
        <property-list class="mt-4" :properties="properties" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import Toolbar from "@/components/includes/Toolbar";
import PropertyStore from "@/components/property/PropertyStore";
import PropertyList from "@/components/property/PropertyList";

export default {
  data() {
    return {
      routeName: "category",
      activeId: 0,
      headers: [
        { text: "Name", value: "name" },
        { text: "Myanmar Name", value: "mm_name" },
        { text: "Chinese Name", value: "cn_name" },
      ],
    };
  },
  computed: {
    ...mapState("MainCategory", ["mainCategories"]),
    ...mapState("Category", ["categories"]),
    ...mapState("Property", ["properties"]),
  },

  components: {
    PropertyStore,
    PropertyList,
    Toolbar,
  },
  methods: {
    getCategoriesByMainId(mainId) {
      this.$store.dispatch("Category/getCategoriesByMainId", mainId);
    },
    getPropertiesByCatId(category) {
      this.activeId = category.id;
      this.$store.dispatch("Property/getPropertiesByCatId", category.id);
    },
    reCheckCategoriesByMainId(mainId) {
      this.getCategoriesByMainId(mainId);
    },
  },

  created() {
    this.$store.dispatch("MainCategory/getMainCategories");
  },
};
</script>

<style scoped>
.header {
  padding: 15px 0px;
}
.link-click {
  cursor: pointer;
}
.link-click:hover {
  color: #5020ff;
}
.link-click-active {
  color: #5020ff !important;
}
.header-title {
  font-family: var(--title-font-family) !important;
  letter-spacing: var(--text-spacing);
  font-weight: var(--text-weight);
  font-size: 18px;
  margin: 0px 10px;
  text-transform: uppercase;
}
</style>
