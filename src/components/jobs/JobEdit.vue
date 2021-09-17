<template>
  <v-card class="pa-3">
    <label>Position</label>
    <v-text-field v-model="data.position" outlined clearable dense>
    </v-text-field>
    <label>Company</label>
    <v-text-field v-model="data.company" outlined clearable dense>
    </v-text-field>
    <label>Company Mail</label>
    <v-text-field v-model="data.company_mail" outlined clearable dense>
    </v-text-field>
    <label>Location</label>
    <v-text-field v-model="data.location" outlined clearable dense>
    </v-text-field>
    <label>Salary Range</label>
    <v-text-field v-model="data.salary_range" outlined clearable dense>
    </v-text-field>
    <label>Description</label>
    <froala
      :tag="'textarea'"
      :config="config"
      v-model="data.description"
    ></froala>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-btn @click.prevent="storeData" type="submit" class="submit-btn">
      <v-icon small left>mdi-checkbox-marked-circle-outline</v-icon>Submit
    </v-btn>
    <v-btn @click.prevent="deleteData" type="button" class="submit-btn ml-3">
      <v-icon small left>mdi-delete</v-icon>Delete
    </v-btn>
  </v-card>
</template>

<script>
export default {
  props: ["data"],
  computed: {},
  data() {
    return {
      config: {
        toolbarButtons: {
          moreText: {
            buttons: [
              "bold",
              "italic",
              "underline",
              "strikeThrough",
              "subscript",
              "superscript",
              "fontFamily",
              "fontSize",
              "textColor",
              "backgroundColor",
              "inlineClass",
              "inlineStyle",
              "clearFormatting",
            ],
          },
          moreParagraph: {
            buttons: [
              "alignLeft",
              "alignCenter",
              "formatOLSimple",
              "alignRight",
              "alignJustify",
              "formatOL",
              "formatUL",
              "paragraphFormat",
              "paragraphStyle",
              "lineHeight",
              "outdent",
              "indent",
              "quote",
            ],
          },
        },
      },
    };
  },
  methods: {
    storeData() {
      var data = {
        position: this.data.position,
        company: this.data.company,
        company_mail: this.data.company_mail,
        location: this.data.location,
        salary_range: this.data.salary_range,
        description: this.data.description,
        id: this.$route.params.id,
      };
      this.$store.dispatch("Jobs/update", data);
      this.$router.push("/jobs");
    },
    deleteData() {
      var data = {
        id: this.$route.params.id,
      };
      this.$store.dispatch("Jobs/deleteData", data);
      this.$router.push("/jobs");
    },
  },
};
</script>

<style scoped>
.v-expansion-panel:before {
  box-shadow: var(--box-shadow) !important;
}
.job-store {
  background-color: var(--background-transparent) !important;
}
.job__header {
  font-size: 17px;
  color: var(--text-color-primary) !important;
}
</style>
