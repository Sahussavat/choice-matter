import { createWebHashHistory, createRouter } from 'vue-router'

import ChoicesView from '../pages/Choices.vue'
import CreateCharView from '../pages/CreateCharacter.vue'
import Shop from '@/pages/Shop.vue'
import Inventory from '@/pages/Inventory.vue'
import { RouteName } from './RouteName'

const routes = [
  { path: '/'+RouteName.HOMEPAGE, name:"choice", component: ChoicesView },
  { path: '/'+RouteName.CREATE_CHAR, name:RouteName.CREATE_CHAR, component: CreateCharView },
  { path: '/'+RouteName.SHOP, name:RouteName.SHOP, component: Shop },
  { path: '/inventory', name:"inventory", component: Inventory },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})