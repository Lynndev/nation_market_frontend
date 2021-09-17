<template>
  <v-card>
    <div class="d-flex align-baseline flex-row header">
      <div>
        <h2 class="header-title">Job List Table</h2>
      </div>
    </div>
    <v-data-table
      :headers="headers"
      :loading="loading"
      :items="jobs"
      :items-per-page="5"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
          color="yellow darken-2"
          class="mr-2"
          @click="$router.push(`/edit-job/${item.id}`)"
          >mdi-pencil-outline</v-icon
        >
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    jobs: {
      type: Array,
    },
  },
  computed: {
    ...mapState("Loading", ["loading"]),
  },
  components: {},
  data() {
    return {
      headers: [
        { text: "Position", value: "position" },
        { text: "Company", value: "company" },
        { text: "Location", value: "location" },
        {
          text: "actions",
          value: "actions",
          align: "center",
        },
      ],
    };
  },
  methods: {},
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
