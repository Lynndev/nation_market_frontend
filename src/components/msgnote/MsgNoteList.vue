<template>
<v-row>
    <v-col md="6" v-for="item in notes" v-bind:key="item.id">
        <v-card elevation="2" shaped class="pl-5 pr-5 pb-5 custom_card">
            <v-card-text>
                <div class="custom_text">{{ item.message }}</div>
            </v-card-text>

            <v-card-actions>
                <v-btn outlined color="success" @click="copyItem(item)">
                    <v-icon>mdi-clipboard-outline</v-icon>
                </v-btn>
                <v-btn outlined color="error" @click="deleteItem(item)">
                    <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</v-row>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    data() {
        return {};
    },
    computed: {
        ...mapState("MsgNote", ["notes"])
    },
    mounted() {
        this.$store.dispatch("MsgNote/getMsgNotes");
    },
    methods: {
        deleteItem(item) {
            this.$store.dispatch("MsgNote/deleteMsgNote", item.id);
        },
        copyItem(item) {
            var dummy = document.createElement("textarea");
            document.body.appendChild(dummy);
            dummy.value = item.message;
            dummy.select();
            document.execCommand("copy");
            document.body.removeChild(dummy);
            const notification = {
                type: "success",
                status: true,
                message: "Copy Message Note Successfully",
            };
            this.$store.dispatch("Notification/add", notification, {
                root: true
            });
        }
    }
};
</script>

<style scoped>
.custom_card {
    min-height: 150px;
}

.custom_text {
    color: black;
    font-size: 16px;
}
</style>
