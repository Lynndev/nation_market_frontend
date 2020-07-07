<template>
  <v-card>
    <div class="d-flex align-baseline flex-row header">
      <div>
        <h2 class="header-title">Property Table</h2>
      </div>
    </div>
    <v-data-table :headers="headers" :items="properties" :items-per-page="5">
      <template v-slot:item.actions="{ item }">
        <v-btn
          @click="showUpdateProperty(item)"
          color="grey darken-1"
          class="white--text"
          depressed
        >
          <v-icon small>
            mdi-pencil-outline
          </v-icon>
          <v-icon small>
            mdi-delete-outline
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <update-property
      :dialog="dialog"
      :property="property"
      @changeDialog="changeDialog"
    />
  </v-card>
</template>

<script>
import UpdateProperty from "@/components/property/modal/UpdateProperty";

export default {
  props: {
    properties: {
      type: Array,
    },
  },
  components: {
    UpdateProperty,
  },
  data() {
    return {
      dialog: false,
      property: {},
      headers: [
        { text: "Name", value: "name" },
        { text: "Myanmar Name", value: "mm_name" },
        { text: "Chinese Name", value: "cn_name" },
        { text: "actions", value: "actions" },
      ],
    };
  },
  methods: {
    showUpdateProperty(property) {
      this.dialog = !this.dialog;
      this.property = property;
      console.log(this.property);
    },
    changeDialog() {
      this.dialog = !this.dialog;
    },
  },
};
</script>

<style scoped>
.header {
  padding: 15px 0px;
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
