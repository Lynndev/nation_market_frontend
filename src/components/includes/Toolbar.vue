<template>
        <v-btn :to="{name: routeName}" class="goback-btn">
            <v-icon small left>mdi-arrow-left-circle-outline</v-icon>go back
        </v-btn>
</template>

<script>
export default {
    props:{
        routeName:{
            type:String,
        }
    },
    methods:{
       
    }
}
</script>

<style scoped>
    .toolbar{
        background-color: var(--background-transparent) !important;
    }
    .toolbar-title{
        font-weight: var(--text-weight) !important;
        letter-spacing: var(--text-spacing) !important;
        color: var(--text-color-primary);
    }
</style>