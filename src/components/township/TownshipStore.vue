<template>
  <v-card>
    <v-expansion-panels>
      <v-expansion-panel class="township-store">
        <v-expansion-panel-header class="township__header">
          Township Store
          <template v-slot:actions>
            <v-icon color="fff">mdi-arrow-down-drop-circle-outline</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-divider></v-divider>
        <v-expansion-panel-content class="mt-4">
          <p class="purple--text lighten-1" v-if="state">State: {{state.name}}</p>
          <p class="red--text lighten-2">{{stateError}}</p>
          <label>Name</label>
          <v-text-field
            v-model="TownshipName"
            outlined
            clearable
            dense
          >
          </v-text-field>
          <v-spacer></v-spacer>
          <v-btn
            @click.prevent="storeTownship"
            type="submit"
            class="submit-btn"
          >
            <v-icon small left>mdi-checkbox-marked-circle-outline</v-icon>Submit
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import { required } from "vuelidate/lib/validators";


export default {
  props: {
    state:{
        type:Object,
        default:() => {
            return {
                name:''
            }
        }
    }
  },
  data() {
    return {
      stateError:'',
      TownshipName: '',
    };
  },
  validations: {
    state: {
      name:{
          required
      }
    },
    TownshipName: {
      required,
    },
  },
  methods: {
    storeTownship() {
      this.$v.$touch()
       if (!this.$v.state.name.required) {
        this.stateError = 'need to choose one state'
      }
      if (!this.$v.$invalid) {

        let data = {
          state_id: this.state.id,
          name: this.TownshipName,
        };

        this.$store.dispatch("Township/storeTownship", data)

        this.stateName = ''
        this.stateId = null;
        this.TownshipName = '';

        this.$v.$reset();
      }
    },
  },
};
</script>

<style scoped>
.v-expansion-panel:before {
  box-shadow: var(--box-shadow) !important;
}
.township-store {
  background-color: var(--background-transparent) !important;
}
.township__header {
  font-size: 17px;
  color: var(--text-color-primary) !important;
}
.theme--light.v-expansion-panels
  .v-expansion-panel-header
  .v-expansion-panel-header__icon
  .v-icon {
  color: var(--text-color-primary) !important;
}
.main-category-title {
  color: var(--text-color-primary) !important;
  font-weight: var(--text-weight) !important;
}
.main-category-btn {
  background-color: rgba(160, 148, 157, 0.69) !important;
  border-radius: 15px;
  color: #fff;
  box-shadow: var(--box-shadow) !important;
}
.main-category-btn-active {
  background-color: rgba(215, 143, 197, 0.69) !important;
  border-radius: 15px;
  color: #fff;
  box-shadow: var(--box-shadow) !important;
}
</style>
