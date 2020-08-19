<template>
  <v-card>
    <div class="d-flex align-baseline flex-row header">
      <div>
        <h2 class="header-title">Currency Table</h2>
      </div>
    </div>
    <v-data-table
      :headers="headers"
      :loading="loading"
      :items="currencys"
      :items-per-page="5"
    >
    </v-data-table>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    currencys: {
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
        { text: "Date", value: "date" },
        { text: "MM Kyat", value: "kyat" },
        { text: "Yuan", value: "yuan" },
        { text: "Baht", value: "baht" },
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
