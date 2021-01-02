<template>
  <v-card>
    <v-row>
      <v-col md="6">
        <table-header>
          <v-btn to="/block/member" class="submit-btn mt-2 ml-3">
            <v-icon left>mdi-account-cancel-outline</v-icon>block member
          </v-btn>
           <v-btn @click="viewTreasureMark" class="blue darken-2 white--text  ml-3">
                View Treasure Mark
          </v-btn>
        </table-header>
      </v-col>
      <v-col md="5">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :loading="loading"
      @click="seeMember(member)"
      :search="search"
      :items="members"
      :items-per-page="10"
    >
      <template v-slot:item.name="{ item }">
        {{ item.name }}
        <span v-if="item.blue_mark==1">
          <img src="@/assets/mark.jpg" class="mark" />
        </span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon color="yellow darken-2" class="mr-2" @click="editMember(item)">mdi-pencil-outline</v-icon>
        <v-icon color="blue darken-2" class="mr-2" @click="chatMember(item)">mdi-message-outline</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import TableHeader from "@/components/includes/TableHeader";
import { mapState } from "vuex";

export default {
  props: {
    members: {
      type: Array
    }
  },
  components: {
    TableHeader
  },
  computed: {
    ...mapState("Loading", ["loading"])
  },
  methods: {
    editMember(member) {
      this.$router.push({
        name: "MemberDetail",
        params: {
          member: member
        }
      });
    },
    chatMember(member) {
      this.$router.push(`/chat?member_id=${member.id}`);
    },
    viewTreasureMark()
    {
        this.$router.push(`/member?mark=true`);
    }
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Name",
          value: "name",
          align: "center"
        },
        // {
        //     text: "Code",
        //     value: "code",
        //     align: "center"
        // },
        {
          text: "phone",
          value: "phone",
          align: "center"
        },
        {
          text: "added_by",
          value: "added_by",
          align: "center"
        },
        {
          text: "actions",
          value: "actions",
          align: "center"
        }
      ]
    };
  }
};
</script>

<style scoped>
.col {
  padding: 0px 12px !important;
}

.mark {
  width: 25px;
  height: 25px;
  margin-left: 10px;
}
</style>
