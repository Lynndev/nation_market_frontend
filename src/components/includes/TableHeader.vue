<template>
    <div class="d-flex align-baseline flex-row header">
          <div>
             <h2 class="header-title">Member Table</h2>
          </div>
          <div>
            <v-btn to="/member/detail" class="add-new-btn">
              <v-icon left>mdi-plus-circle-outline</v-icon>
              Add new
            </v-btn>
            
            <slot></slot>
          </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.header{
  padding: 10px 0px;
}   
.header-title{
    font-family: var(--title-font-family) !important;
    letter-spacing: var(--text-spacing);
    font-weight: var(--text-weight);
    font-size: 18px;
    margin: 0px 10px;
    text-transform: uppercase;
}
.add-new-btn{
  box-shadow: 0 12px 20px -10px rgba(7, 229, 245, 0.317), 0 4px 20px 0 rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(12, 202, 245, 0.297) !important;
  background-color: #12CDEF !important;
  color: #fff !important;
}
</style>