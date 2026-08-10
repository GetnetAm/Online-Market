import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ComputerView from '@/views/categories/ComputerView.vue'

// Category views are lazy-loaded so the initial bundle stays small.
const ElectronicsView = () => import('@/views/categories/ElectronicsView.vue')
const FashionView = () => import('@/views/categories/FashionView.vue')
const HomeFurnitureView = () => import('@/views/categories/HomeFurnitureView.vue')
const BeautyView = () => import('@/views/categories/BeautyView.vue')
const ToysHobbiesView = () => import('@/views/categories/ToysHobbiesView.vue')
const ProductDetailView = () => import('@/views/ProductDetailView.vue')

// Typing routes as RouteRecordRaw[] catches mistakes like a missing `component`
// or an invalid route option at compile time instead of at runtime.
const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/category/electronics', name: 'electronics', component: ElectronicsView },
  { path: '/category/electronics/Laptops', name: 'Laptops', component: ComputerView },
  { path: '/category/fashion', name: 'fashion', component: FashionView },
  { path: '/category/home-furniture', name: 'home-furniture', component: HomeFurnitureView },
  { path: '/category/beauty', name: 'beauty', component: BeautyView },
  { path: '/category/toys-hobbies-media', name: 'toys-hobbies-media', component: ToysHobbiesView },
  // :id is a dynamic route param, read in ProductDetailView via useRoute().params.id
  { path: '/product/:id', name: 'product-detail', component: ProductDetailView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

export default router
