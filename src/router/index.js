import { createRouter, createWebHistory } from 'vue-router'
import Quote from '../views/Quote.vue'
import QuoteCalculator from '../components/Quote/QuoteCalculator.vue'
import SuccessPage from '../views/Success/SuccessPage.vue'

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
    },
    {
      path: '/Success',
      name: 'SuccessPage',
      component: SuccessPage
    }
  ]
})

export default router
