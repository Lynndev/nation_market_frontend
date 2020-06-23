<template>
    <v-container fluid>
        <v-card>
        <v-data-table
        :headers="headers"
        :items="blockMembers"
        :items-per-page="5">

        <template v-slot:item.actions="{ item }">
          <v-btn color="green darken-2" outlined depressed class="white--text" @click="unblockMember(item)">
           unblock
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    </v-container>
</template>


<script>
import {mapState} from 'vuex'

export default {
    data(){
        return {
        headers: [
            { text: "Name", value: "name",align:'center'},
            { text: "Code", value: "code",align:'center'},
            { text: "phone", value: "phone",align:'center'},
            { text: "added_by", value: "added_by",align:'center'},
            { text: "actions",value:'actions',align:'center'},
        ],
        }
    },
    methods:{
        unblockMember(member){
            if(member.id){
                this.$store.dispatch('Member/unblockMember',member.id)
            }
        }
    },
    computed:{
        ...mapState('Member',['blockMembers'])
    },
    created(){
        this.$store.dispatch('Member/getBlockMembers')
    }
}
</script>