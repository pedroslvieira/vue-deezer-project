import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TracksView from "../views/TracksView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/tracks",
      name: "tracks",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: TracksView,
      // component: () => import("../views/TracksView.vue"),
    },
  ],
});

export default router;
