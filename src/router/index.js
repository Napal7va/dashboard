import {createRouter, createWebHistory} from 'vue-router'
import dashboard from "@/pages/master/dashboard.vue";
import Comp from "@/components/Comp.vue";
import home from "@/pages/home.vue";


const routes = [
    {
        name: "Dashboard",
        path: "/",
        component: dashboard
    },
    {
        name: "Table",
        path: "/table",
        component: Comp
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