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
      path: "/shop/detail/:shopId",
      name: "ShopDetail",
      component: lazyLoad("ShopDetail"),
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
    {
      path: "/package/purchase",
      name: "packagePurchase",
      component: lazyLoad("PackagePurchase"),
      props: true,
      meta: {
        forAuth: true,
      },
    },
    {
      path: "/package",
      name: "package",
      component: lazyLoad("Package"),
      props: true,
      meta: {
        forAuth: true,
      },
    },
    {
      path: "/setting",
      name: "setting",
      component: lazyLoad("Setting"),
      meta: {
        forAuth: true,
      },
    },
    {
      path: "/payment-method",
      name: "payment-method",
      component: lazyLoad("PaymentMethod"),
      meta: {
        forAuth: true,
      },
    },
    {
      path: "/currency",
      name: "currency",
      component: lazyLoad("Currency"),
      meta: {
        forAuth: true,
      },
    },
    {
      path: "/chat",
      name: "chat",
      component: lazyLoad("Chat"),
      meta: {
        forAuth: true,
      },
    },
    {
      path: "/message-note",
      name: "message_note",
      component: lazyLoad("MessageNote"),
      meta: {
        forAuth: true,
      },
    },
    {
      path: "/ads",
      name: "ads",
      component: lazyLoad("Ads/Ads"),
      meta: {
        forAuth: true,
      },
    },
    {
      path: "/admin",
      name: "admin",
      component: lazyLoad("Admin/Admin"),
      meta: {
        forAuth: true,
      },
    },
    {
      path: "/admin/edit/:id",
      name: "edit-admin",
      component: lazyLoad("Admin/EditAdmin"),
      meta: {
        forAuth: true,
      },
    },
    {
      path: "/jobs",
      name: "job",
      component: lazyLoad("Job"),
      meta: {
        forAuth: true,
      },
    },
    {
      path: "/edit-job/:id",
      name: "edit-job",
      component: lazyLoad("EditJob"),
      meta: {
        forAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("nhm_token");

  if (to.matched.some((record) => record.meta.forAuth) && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
