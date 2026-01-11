import { createRouter, createWebHashHistory } from 'vue-router'
import RouteManagement from "../views/RouteManagement.vue";
import AllRouts from "../views/AllRoutes.vue";
//URLs
const routes = [
  {
        path: "/",
        name: "AllRouts",
        component: AllRouts,
    }, {
        path: '/routemanagement',
        name: 'RouteManagement',
        component: RouteManagement,
    },
    { //will route to AllPosts view if none of the previous routes apply
        path: "/:catchAll(.*)",
        name: "AllRouts",
        component: AllRouts,
    }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
