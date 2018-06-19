import VueRouter from 'vue-router';
import LoginForm from './components/LoginForm.vue';
import NavBar from './components/NavBar.vue';
import EventForm from './components/EventForm.vue';
import ContactForm from './components/ContactForm';
import DashboardView from './components/DashboardView';
import EventsList from './components/EventsList';
import ContactsList from './components/ContactsList';


export default new VueRouter({
  routes: [
    { path: '/', component: LoginForm },
    // { path: '/', component: NavBar },
    { path: '/event', component: EventForm },
    { path: '/contact', component: ContactForm },
    { 
      path: '/dashboard', 
      component: DashboardView,
      children: [
        { path: 'events', component: EventsList },
        { path: 'contacts', component: ContactsList },
      ]
    },
    { path: '*', redirect: '/' }
  ]
});