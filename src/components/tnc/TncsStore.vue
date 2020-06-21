<template>
    <v-container fluid>
    <v-row>
        <froala :tag="'textarea'" :config="config" v-model="tncs.description"></froala>
    </v-row>
    <v-row justify="center">
        <v-btn type="submit" @click="updateTnc" block class="edit-btn mt-4">
            <v-icon  class="mt-2" left>mdi-border-color</v-icon>
            Update
        </v-btn>
    </v-row>
    </v-container>
</template>

<script>

export default {
    props:{
        tncs:{
            type:Object
        }
    },
    data () {
    return {
      config: {
        toolbarButtons: {
          'moreText': {
            'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
          },
          'moreParagraph': {
            'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
          },
        },
      },
    }
  },
  methods:{
      updateTnc(){
          this.$store.dispatch('Tnc/updateTnc',{description:this.tncs.description})
      }
  }
}
</script>