<template>
<v-card>
    <v-expansion-panels>
        <v-expansion-panel class="currency-store">
            <v-expansion-panel-header class="currency__header">
                Message Note Store
                <template v-slot:actions>
                    <v-icon color="fff">mdi-arrow-down-drop-circle-outline</v-icon>
                </template>
            </v-expansion-panel-header>
            <v-divider></v-divider>
            <v-expansion-panel-content class="mt-4">
                <label>Note</label>

                <v-textarea v-model="note" outlined name="input-7-4" label="Your Note here"></v-textarea>

                <v-spacer></v-spacer>
                <v-btn @click.prevent="storeNote" type="submit" class="submit-btn">
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
            note: null
        };
    },
    methods: {
        storeNote() {
            let data = {
                message: this.note
            };

            this.$store.dispatch("MsgNote/storeMsgNote", data);

            this.note = null;
        }
    },
    computed: {}
};
</script>

<style scoped>
.v-expansion-panel:before {
    box-shadow: var(--box-shadow) !important;
}

.currency-store {
    background-color: var(--background-transparent) !important;
}

.currency__header {
    font-size: 17px;
    color: var(--text-color-primary) !important;
}

.theme--light.v-expansion-panels .v-expansion-panel-header .v-expansion-panel-header__icon .v-icon {
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
