<template>
<v-container fluid>
    <v-row justify="center">
        <v-col md="10">
            <msg-note-store />
        </v-col>
    </v-row>
    <v-row justify="center">
        <v-col md="10">
            <msg-note-list />
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import MsgNoteStore from "@/components/msgnote/MsgNoteStore";
import MsgNoteList from "@/components/msgnote/MsgNoteList";

export default {
    data() {
        return {};
    },

    components: {
        MsgNoteStore,
        MsgNoteList
    },
    methods: {},

    created() {
        // this.$store.dispatch("Currency/getCurrencys");
    }
};
</script>

<style>
</style>
