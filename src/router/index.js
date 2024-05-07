import {createRouter, createWebHistory} from 'vue-router'
import dashboard from "@/pages/master/dashboard.vue";
import Table from '@/components/Table/Table.vue';
import MainAdmin from "@/components/Admin/MainAdmin.vue";



const routes = [
    {
        name: "Dashboard",
        path: "/",
        component: dashboard
    },
    {
        name: "MainAdmin",
        path: "/admin",
        component: MainAdmin
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