<template>
  <v-row justify="center">
    <v-dialog v-model="deleteStatus" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Delete this Category</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">Disagree</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
    props:{
        deleteStatus:{
            type:Boolean
        }
    }
}
</script>