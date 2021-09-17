<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="7">
        <job-store />
      </v-col>
      <v-col md="7">
        <job-list :jobs="data" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import JobStore from "@/components/jobs/JobStore";
import JobList from "@/components/jobs/JobList";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("Jobs", ["data"]),
  },
  components: {
    JobStore,
    JobList,
  },
  methods: {},

  created() {
    this.$store.dispatch("Jobs/getAll");
  },
};
</script>
<style scoped></style>
