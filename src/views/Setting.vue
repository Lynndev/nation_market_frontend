<template>
<v-container fluid>
    <v-row>
        <v-col v-for="list in lists" :key="list.name" md="4" v-show="!list.mainAdmin || (list.mainAdmin==true && adminData.role==3)">
            <router-link :to="list.route">
                <v-card class="pa-3">
                    <div class="text-center icon">
                        <v-icon>{{ list.icon }}</v-icon>
                    </div>
                    <p class="text-center">{{ list.name }}</p>
                </v-card>
            </router-link>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            lists: [{
                    route: "/payment-method",
                    name: "Payment Method",
                    icon: "mdi-credit-card-outline",
                    mainAdmin:true
                },
                {
                    route: "/currency",
                    name: "Currency",
                    icon: "mdi-currency-usd-circle-outline",
                    mainAdmin:true
                },
                {
                    route: "/message-note",
                    name: "Message Note",
                    icon: "mdi-note-outline"
                }
            ]
        };
    },
    computed: {
        ...mapState("User",["adminData"])
    },

    components: {},
    methods: {},

    created() {}
};
</script>

<style scoped>
.icon i {
    color: var(--text-color-primary);
    font-size: 2.92rem !important;
    line-height: 110%;
    margin: 1.9466666667rem 0 0 0;
}

p {
    color: var(--text-color-primary);
    font-size: 18px !important;
    letter-spacing: var(--text-spacing);
    margin-top: 10px;
    text-transform: uppercase;
}
</style>
