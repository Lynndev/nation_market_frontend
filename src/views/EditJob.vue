<template>
  <v-container fluid>
    <v-row justify="center" v-if="!loading">
      <v-col md="7">
        <job-edit :data="eachData" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import JobEdit from "@/components/jobs/JobEdit";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("Loading", ["loading"]),
    ...mapState("Jobs", ["eachData"]),
  },
  components: {
    JobEdit,
  },
  methods: {},
  created() {
    this.$store.dispatch("Jobs/getEach", this.$route.params.id);
  },
};
</script>
<style scoped></style>
