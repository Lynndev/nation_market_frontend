<template>
  <v-container fluid>
    <froala
      :tag="'textarea'"
      :config="config"
      v-model="tncs.description"
    ></froala>
    <v-row>
      <v-spacer />
      <v-col md="6">
        <v-btn type="submit" @click="updateTnc" block class="edit-btn">
          <v-icon left>mdi-border-color</v-icon>
          Update
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    tncs: {
      type: Object,
    },
  },
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
    updateTnc() {
      this.$store.dispatch("Tnc/updateTnc", {
        description: this.tncs.description,
      });
    },
  },
};
</script>
