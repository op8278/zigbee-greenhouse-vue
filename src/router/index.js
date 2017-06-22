import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Temperature from '@/components/temperature/Temperature.vue';
import Humidity from '@/components/humidity/Humidity.vue';

// Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/t',
      name: 'Temperature',
      component: Temperature
    },
    {
      path: '/h',
      name: 'Humidity',
      component: Humidity
    },
    {
      path: '/',
      name: 'Humidity',
      component: Humidity
    }
  ]
})
