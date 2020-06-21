<template>
   <v-card>
       <table-header/>
        <v-data-table
        :headers="headers"
        @click="seeMember(member)"
        :items="members"
        :items-per-page="5">

        <template v-slot:item.actions="{ item }">
          <v-icon color="yellow darken-2" class="mr-2" @click="editMember(item)">
            mdi-pencil-outline
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
</template>

<script>
import TableHeader from '@/components/includes/TableHeader'

export default {
    props:{
        members:{
            type:Array
        }
    },
    components:{
        TableHeader
    },
    methods:{
      editMember(member){
        this.$router.push({name:'MemberDetail',params:{member:member}})
      }
    },
    data() {
    return {
      headers: [
        { text: "Name", value: "name",align:'center'},
        { text: "Code", value: "code",align:'center'},
        { text: "phone", value: "phone",align:'center'},
        { text: "added_by", value: "added_by",align:'center'},
        { text: "actions",value:'actions',align:'center'},
      ],
    };
  },
}
</script>
