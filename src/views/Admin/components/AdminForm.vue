<template>
  <section>
    <label>Name</label>
    <v-text-field v-model="data.name" outlined name="input-7-4" label="Your name here"></v-text-field>
    <v-spacer></v-spacer>
    <label>Role</label>
    <v-select
      :items="[{name:'Admin',id:1},{name:'Editor',id:2}]"
      class="mb-4"
      item-text="name"
      item-value="id"
      hide-details
      label="choose section"
      v-model="data.role"
      solo
    ></v-select>
    <v-spacer></v-spacer>
    <label>State</label>
    <v-select
      :items="states"
      class="mb-4"
      item-text="name"
      item-value="id"
      v-model="data.state_id"
      hide-details
      label="choose state"
      solo
    ></v-select>
    <v-spacer></v-spacer>
    <v-btn @click.prevent="storeData" type="submit" class="submit-btn">
      <v-icon small left>mdi-checkbox-marked-circle-outline</v-icon>Submit
    </v-btn>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          name: null,
          state_id: null,
          role: null,
          id: null
        };
      }
    }
  },

  methods: {
    storeData() {
      this.$emit("storeData", this.data);
    }
  },
  computed: {
    ...mapState("States", ["states"])
  },
  created() {
    this.$store.dispatch("States/getStates");
  }
};
</script>

<style>
</style>