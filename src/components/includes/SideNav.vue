<template>
  <v-navigation-drawer app floating v-model="drawer" letft class="main-nav">
    <router-link to="/profile">
      <v-list-item>
        <v-list-item-content to="/profile">
          <v-list-item-title class="title text-center">
            <v-icon>mdi-account-cog-outline</v-icon> {{ adminData.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </router-link>

    <v-list-item
      v-for="sideList in sideLists"
      :key="sideList.name"
      :to="sideList.route"
      class="link-list-item"
      v-show="(sideList.mainAdmin==true && adminData.role==3) || !sideList.mainAdmin"
    >
      <v-list-item-action>
        <v-icon class="link-icon">{{ sideList.icon }}</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title class="link-title">{{
          sideList.name
        }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item @click="logout" class="link-list-item">
      <v-list-item-action>
        <v-icon class="link-icon">mdi-logout</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title class="link-title">Logout</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    drawer: Boolean,
  },
  data() {
    return {
      sideLists: [
        { route: "/", name: "Dashboard", icon: "mdi-view-dashboard-outline" },
        { route: "/member", name: "Member", icon: "mdi-account-group-outline" },
        { route: "/admin", name: "Admin", icon: "mdi-package-variant" ,mainAdmin:true},
        {
          route: "/category",
          name: "Category",
          icon: "mdi-clipboard-text-outline",
          mainAdmin:true
        },
        { route: "/shop", name: "Shop", icon: "mdi-storefront" },
        {
          route: "/state-township",
          name: "State & Township",
          icon: "mdi-office-building",
        },
        { route: "/package", name: "Package", icon: "mdi-package-variant" ,mainAdmin:true},
        {
          route: "/tnc",
          name: "Terms&Conditions",
          icon: "mdi-script-text-outline",
          mainAdmin:true
        },
        {
          route: "/setting",
          name: "Setting",
          icon: "mdi-cog-outline",
        },
        {
          route: "/chat",
          name: "Chat Box",
          icon: "mdi-chat-processing-outline",
        },
        { route: "/ads", name: "Ads", icon: "mdi-package-variant" ,mainAdmin:true},
        
      ],
    };
  },
  computed: {
    ...mapState("User", ["adminData"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("User/logout").then(() => {
        this.$store.dispatch("Cart/resetCartState");
      });
    },
  },
};
</script>

<style scoped>
.main-nav {
  background: var(--background-transparent) !important;
  z-index: 1;
  overflow: hidden;
}
/* .main-nav:before{
      z-index: -1;
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(234, 228, 217, 0.251) !important;
      box-shadow: inset 0px 1000px 1000px rgba(255, 255, 255, 0.255);
      filter: blur(200px);
    } */
.v-application .title {
  color: var(--text-color-primary);
  font-weight: var(--text-weight) !important;
  letter-spacing: var(--text-spacing) !important;
  font-family: var(--title-font-family) !important;
  font-size: 16px !important;
}
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: rgb(255, 255, 255) !important;
}
.theme--light.v-icon {
  color: var(--text-color-primary) !important;
}
.theme--light.v-list-item--active:hover::before,
.theme--light.v-list-item--active::before {
  opacity: 0;
}
.link-list-item {
  transition: all 0.2s ease-in-out !important;
  margin: 5px 10px;
}
.link-list-item:hover {
  background-color: rgba(181, 178, 178, 0.251) !important;
  box-shadow: inset 0 0 30px #ffffff !important;
  border-radius: var(--btn-radius) !important;
}
.v-list-item--active {
  background-color: rgba(70, 70, 70, 0.251) !important;
  box-shadow: inset 0 0 30px #ffffff !important;
  border-radius: var(--btn-radius);
  transform: translateY(-3px);
}
.link-icon {
  color: var(--text-color-primary) !important;
}
.v-list-item__action {
  margin: 0px 10px !important;
}
.v-list-item {
  min-height: 40px !important;
}
.link-title {
  color: var(--text-color-primary);
  font-size: var(--text-size) !important;
  font-weight: var(---text-weight) !important;
  letter-spacing: var(--text-spacing);
}
</style>
