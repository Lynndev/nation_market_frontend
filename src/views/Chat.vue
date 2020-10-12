<template>
<v-container>
    <v-row class="no-gutters">
        <v-col cols="12" sm="3" class="flex-grow-1 flex-shrink-0" style="border-right: 1px solid #0000001f;">
            <v-responsive class="overflow-y-auto fill-height" height="670">
                <v-list subheader>
                    <v-list-item-group>
                        <v-text-field v-model="search" append-icon="mdi-magnify" background-color="white" class="mb-2" placeholder="search..." hide-details no-details outlined dense></v-text-field>
                        <template v-for="(item, index) in filterMembers">
                            <v-list-item @click="getMemberMessages(item.id)" :key="`parent${index}`" :value="item.id">
                                <v-list-item-avatar>
                                    <v-img v-if="item.profile" :src="item.profile"></v-img>
                                    <v-img v-else :src="defaultProfile"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.name" />
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider :key="`chatDivider${index}`" class="my-0" />
                        </template>
                    </v-list-item-group>
                </v-list>
            </v-responsive>
        </v-col>
        <v-col cols="auto" class="flex-grow-1 flex-shrink-0" v-if="!pre_loading">
            <chat-message :newMessages="messages" :memberId="memberId" />
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import {
    mapState
} from "vuex";
import Pusher from "pusher-js";
import ChatMessage from "@/components/chat/ChatMessage";
const defaultProfile = require("../assets/profile.png");

export default {
    components: {
        ChatMessage
    },
    data() {
        return {
            defaultProfile: defaultProfile,
            memberId: null,
            search: ""
        };
    },
    methods: {
        getMemberMessages(id) {
            this.$router.push({
                path: "chat",
                query: {
                    member_id: id
                }
            });
        },
        loadMessage() {
            this.$store.dispatch(
                "Member/getMemberMessages",
                this.$route.query.member_id
            );
        }
    },
    computed: {
        ...mapState("Member", ["chatMembers"]),
        ...mapState("Loading", ["loading"]),
        ...mapState("Loading", ["action_loading"]),
        ...mapState("Loading", ["pre_loading"]),
        ...mapState("Member", ["messages"]),

        filterMembers() {
            return this.chatMembers.filter(chatMember => {
                return chatMember.name.toLowerCase().match(this.search);
            });
        }
    },
    watch: {
        $route() {
            this.loadMessage();
        }
    },
    created() {
        this.$store.dispatch("Member/getChatMembers").then(() => {
            this.loadMessage();
        });
    },
    mounted() {
        let pusher = new Pusher("02508ccf9778177f2bbe", {
            ignoreNullOrigin: true,
            authEndpoint: "http://nationmarket.82206954-6-20190910110805.webstarterz.com/broadcasting/auth",
            cluster: "ap1",
            auth: {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + localStorage.getItem("nhm_token")
                }
            }
        });

        var channel = pusher.subscribe(`private-admin-tochat`);

        channel.bind("admin.message.sent", data => {
            if (this.$route.query.member_id) {
                if (data.message.member_id == this.$route.query.member_id) {
                    this.$store.dispatch("Member/appendMessage", data.message);
                }
            }
            this.$store.dispatch("Member/manageMember", data.message.member);

            const notification = {
                type: "success",
                status: true,
                message: `You received a new message from ${data.message.member.name}`
            };
            this.$store.dispatch("Notification/add", notification);
        });
    }
};
</script>

<style scoped>
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    color: rgba(0, 0, 0, 0.87) !important;
    background-color: #fff !important;
}

.chat-box {
    height: 87vh !important;
}

.member-list {
    overflow-y: scroll;
    height: 77vh;
}
</style>
