import Vue from "vue";
import Router from "vue-router";

function lazyLoad(component) {
  return () => import(`@/views/${component}.vue`);
}

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: lazyLoad("Login"),
    },
    {
      path: "/",
      name: "home",
      component: lazyLoad("Home"),
      meta: {
        forAuth: true,
      },
    },
    {
      path: "/profile",
      name: "adminProfile",
      component: lazyLoad("AdminProfile"),
      meta: {
        forAuth: true,
      },
    },
    {
      path: "/member",
      name: "member",
      component: lazyLoad("Member"),
      meta: {
        forAuth: true,
      },
    },
    {
      path: "/member/detail",
      name: "MemberDetail",
      component: lazyLoad("MemberDetail"),
      props: true,
      meta: {
        forAuth: true,
      },
    },
    {
      path: "/block/member",
      name: "BlockMemberList",
      component: lazyLoad("BlockMemberList"),
      meta: {
        forAuth: true,
      },
    },
    {
      path: "/tnc",
      name: "tnc",
      component: lazyLoad("Tnc"),
      meta: {
        forAuth: true,
      },
    },
    {
      path: "/category",
      name: "category",
      component: lazyLoad("Category"),
      meta: {
        forAuth: true,
      },
    },
    {
      path: "/shop",
      name: "shop",
      component: lazyLoad("Shop"),
      meta: {
        forAuth: true,
      },
    },
    {
      path: "/shop/detail",
      name: "ShopDetail",
      component: lazyLoad("ShopDetail"),
      props: true,
      meta: {
        forAuth: true,
      },
    },
    {
      path: "/property",
      name: "Property",
      component: lazyLoad("Property"),
      props: true,
      meta: {
        forAuth: true,
      },
    },
    {
      path: "/state-township",
      name: "stateTownship",
      component: lazyLoad("StateTownship"),
      props: true,
      meta: {
        forAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("token");

  if (to.matched.some((record) => record.meta.forAuth) && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
