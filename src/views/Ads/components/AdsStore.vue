<template>
  <v-card>
    <v-expansion-panels>
      <v-expansion-panel class="currency-store">
        <v-expansion-panel-header class="currency__header">
          New Ads
          <template v-slot:actions>
            <v-icon color="fff">mdi-arrow-down-drop-circle-outline</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-divider></v-divider>
        <v-expansion-panel-content class="mt-4">
          <label>Link</label>
          <v-text-field v-model="link" outlined name="input-7-4" label="Your Link here"></v-text-field>
          <v-spacer></v-spacer>
          <label>Section</label>
          <v-select
            :items="[{name:'Ads 1',id:1},{name:'Ads 2',id:2},{name:'Ads 3',id:3}]"
            class="mb-4"
            item-text="name"
            item-value="id"
            hide-details
            label="choose section"
            v-model="section_id"
            return-object
            solo
          ></v-select>
          <v-spacer></v-spacer>
          <label>Image</label>
          <v-file-input truncate-length="15" v-model="image"></v-file-input>
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
      section_id: "",
      link: "",
      image: ""
    };
  },
  methods: {
    storeData() {
      let fd = new FormData();
      fd.append("section_id", this.section_id.id);
      fd.append("link", this.link);
      fd.append("image", this.image);
      this.$store.dispatch("Ads/create", fd);
    }
  }
};
</script>

<style>
</style>