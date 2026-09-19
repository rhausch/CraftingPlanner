import { createRouter, createWebHashHistory } from 'vue-router'
import ItemManager from '@/views/ItemManager.vue'
import RecipeManager from "@/views/RecipeManager";
import ExportManager from "@/views/ExportManager";
import InventoryManager from "@/views/InventoryManager";

  const routes = [
    {
      path: '/',
      name: 'Items',
      component: ItemManager, ExportManager,
    },
    {
      path: '/recipes',
      name: 'Recipes',
      component: RecipeManager
    },
    {
      path: '/inventory',
      name: "Inventory",
      component: InventoryManager,
    },
    {
      path: '/export',
      name: "Export",
      component: ExportManager,
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/About.vue')
    }
  ]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
