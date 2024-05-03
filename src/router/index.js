import {createRouter, createWebHistory} from 'vue-router'
import dashboard from "@/pages/master/dashboard.vue";
import Table from '@/components/Table/Table.vue';



const routes = [
    {
        name: "Dashboard",
        path: "/",
        component: dashboard
    },
    {
        name: "Table",
        path: "/",
        component: Table
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