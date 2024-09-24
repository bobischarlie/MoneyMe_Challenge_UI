import { createRouter, createWebHistory } from 'vue-router'
import Quote from '../views/Quote.vue'
import QuoteCalculator from '../components/Quote/QuoteCalculator.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Quote
    },
    {
      path: '/:id',
      name: 'QuoteCalculator',
      component: QuoteCalculator
    }
  ]
})

export default router
