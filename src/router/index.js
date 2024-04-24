import {createRouter, createWebHistory} from 'vue-router'
import dashboard from "@/pages/master/dashboard.vue";
import home from "@/pages/home.vue";


const routes = [
    {
        name: "Dashboard",
        path: "/",
        component: dashboard
    },
    {
        name: "Home",
        path: "/home",
        component: home
    }
];
const router = Router();
export default router;
function Router() {
    const router = new createRouter({
        history: createWebHistory(),
        routes,
    });
    return router;
}