import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TracksView from "../views/TracksView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: HomeView,
    //   meta: {
    //     enterClass: "animate__animated animate__fadeInLeft",
    //     leaveClass: "animate__animated animate__fadeOutRight",
    //   },
    // },
    {
      path: "/",
      name: "home",
      component: TracksView,
      meta: {
        enterClass: "animate__animated animate__fadeInRight",
        leaveClass: "animate__animated animate__fadeOutLeft",
      },
    },
  ],
});

export default router;
