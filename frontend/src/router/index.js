import Vue from 'vue';
import VueRouter from 'vue-router';


import TutorialsList from '../components/TutorialsList'
import Tutorial from '../components/Tutorial'
import AddTutorial from '../components/AddTutorial'


Vue.use(VueRouter);

const routes =  [
  {
    path: "/",
    alias: "/tutorials",
    name: "tutorials",
    component: TutorialsList,
  },
  {
    path: "/tutorials/:id",
    name: "tutorial-details",
    component: Tutorial,
  },
  {
    path: "/add",
    name: "add",
    component: AddTutorial,
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
