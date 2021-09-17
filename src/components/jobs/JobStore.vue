<template>
  <v-card>
    <v-expansion-panels>
      <v-expansion-panel class="job-store">
        <v-expansion-panel-header class="job__header">
          Job Store
          <template v-slot:actions>
            <v-icon color="fff">mdi-arrow-down-drop-circle-outline</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-divider></v-divider>
        <v-expansion-panel-content class="mt-4">
          <label>Position</label>
          <v-text-field v-model="position" outlined clearable dense>
          </v-text-field>
          <label>Company</label>
          <v-text-field v-model="company" outlined clearable dense>
          </v-text-field>
          <label>Company Mail</label>
          <v-text-field v-model="company_mail" outlined clearable dense>
          </v-text-field>
          <label>Location</label>
          <v-text-field v-model="location" outlined clearable dense>
          </v-text-field>
          <label>Salary Range</label>
          <v-text-field v-model="salary_range" outlined clearable dense>
          </v-text-field>
          <label>Description</label>
          <froala
            :tag="'textarea'"
            :config="config"
            v-model="description"
          ></froala>
          <v-spacer></v-spacer>
          <v-btn @click.prevent="storeData" type="submit" class="submit-btn">
            <v-icon small left>mdi-checkbox-marked-circle-outline</v-icon>Submit
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      position: "",
      company: "",
      company_mail: "",
      location: "",
      salary_range: "",
      description: "",
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

  computed: {},
  methods: {
    storeData() {
      var data = {
        position: this.position,
        company: this.company,
        company_mail: this.company_mail,
        location: this.location,
        salary_range: this.salary_range,
        description: this.description,
      };
      this.$store.dispatch("Jobs/store", data);
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
