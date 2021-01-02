<template>
  <v-row>
    <v-col md="8" offset-md="2">
      <ads-store></ads-store>
    </v-col>
    <v-col md="10" offset-md="1">
      <v-data-table :headers="headers" :loading="loading" :items="ads" :items-per-page="10">
        <template v-slot:item.image="{ item }">
          <div class="pa-2">
            <img :src="item.image" width="50" height="50" alt />
          </div>
        </template>
        <template v-slot:item.section="{ item }">
          <span v-if="item.section_id==1">Ads 1</span>
          <span v-if="item.section_id==2">Ads 2</span>
          <span v-if="item.section_id==3">Ads 3</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon color="red darken-2" class="mr-2" @click="deleteAds(item)">mdi-delete-outline</v-icon>
          
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import AdsStore from "./components/AdsStore.vue";
import { mapState } from "vuex";
export default {
  components: {
    AdsStore
  },
  created() {
    this.$store.dispatch("Ads/get");
  },
  computed: {
    ...mapState("Ads", ["ads"])
  },
  methods: {
    deleteAds(item)
    {
      this.$store.dispatch("Ads/delete",item.id);
    }
  },
  data() {
    return {
      headers: [
        {
          text: "Link",
          value: "link",
          align: "center"
        },
        {
          text: "Image",
          value: "image",
          align: "center"
        },
        {
          text: "Section",
          value: "section",
          align: "center"
        },

        {
          text: "actions",
          value: "actions",
          align: "center"
        }
      ]
    };
  }
};
</script>

<style>
</style>