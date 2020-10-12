<template>
<v-responsive class="overflow-y-hidden fill-height" height="670">
    <v-card class="d-flex flex-column fill-height">
        <v-card-text v-chat-scroll="{ smooth: true }" class="flex-grow-1 overflow-y-auto">
            <template v-for="(msg, i) in organizedMessages">
                <div :key="i" :class="{ 'd-flex flex-row-reverse': msg.status == 2 }">
                    <v-chip v-if="msg.body.type == 1" :color="msg.status == 2 ? 'primary' : ''" dark style="height:auto;white-space: normal;" class="pa-2 mb-2 message">{{ msg.body.text }}</v-chip>
                    <!-- if message is image  -->
                    <v-chip v-else :color="
                msg.status == 2 || msg.body.type == 2 ? 'blue lighten-5' : ''
              " style="height:auto;white-space: normal;" class="pa-2 mb-2 message">
                        <v-img alt="profile" :src="msg.body.image" />
                    </v-chip>
                    <sub class="ml-2" style="font-size: 0.5rem;">{{ msg.created_at | formatDateTime }}</sub>
                </div>
            </template>
        </v-card-text>
        <v-card-text class="flex-shrink-1">
            <v-text-field v-model="adminMessage" label="type here..." type="text" no-details outlined dense append-outer-icon="send" append-icon="image" @keyup.enter="sendMessageFromAdmin" @click:append-outer="sendMessageFromAdmin" @click:append="handleRefImage" hide-details />
            <input ref="image" type="file" style="display:none" @change="sendImageFromAdmin" />
        </v-card-text>
    </v-card>
</v-responsive>
</template>

<script>
import {
    mapState
} from "vuex";

export default {
    props: {
        newMessages: {
            type: Array
        },
        memberId: {
            type: Number
        }
    },

    data() {
        return {
            adminMessage: ""
        };
    },
    methods: {
        handleRefImage() {
            this.$refs.image.click();
        },
        sendImageFromAdmin(e) {
            const files = e.target.files;

            let formData = new FormData();
            formData.append("member_id", this.$route.query.member_id);
            formData.append("body[type]", 2);
            formData.append("image", files[0]);

            this.$store.dispatch("Member/sendMessageFromAdmin", formData).then(() => {
                this.adminMessage = "";
            });
        },
        sendMessageFromAdmin() {
            let messageForm = {
                member_id: this.$route.query.member_id,
                body: {
                    type: 1,
                    text: this.adminMessage
                }
            };

            this.$store
                .dispatch("Member/sendMessageFromAdmin", messageForm)
                .then(() => {
                    this.adminMessage = "";
                });
        }
    },
    computed: {
        organizedMessages() {
            return this.newMessages.map(val => {
                if (typeof val.body == "string") {
                    let body = JSON.parse(val.body);
                    val.body = body;
                }
                return val;
            });
        },
        ...mapState("User", ["token"])
    }
};
</script>

<style scoped>
.message {
    max-width: 330px !important;
}
</style>
