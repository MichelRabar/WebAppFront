import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserRegister from '../views/UserRegister.vue';
import UserLogin from '../views/UserLogin.vue';
import ProfileView from '@/views/ProfileView.vue'; // Dodajte vašu komponentu za profil
import TrainersView from '../views/TreneriView.vue';
import MealsView from '../views/TrenerMaleprepView.vue';
import MealView from '@/views/MealView.vue';
import UpdateProfile from '@/views/UpdateProfileView.vue'; // Uvezite komponentu
import WorkoutsView from '../views/WorkoutListView.vue';
import AddWorkout from '../views/AddWorkout.vue';
import EditWorkout from '../views/EditWorkout.vue';
import DeleteWorkout from '../views/DeleteWorkout.vue';
import MojiTreninzi from '../views/MyWorkout.vue'; // Uvezite komponentu
import MojiObroci from '../views/MyMeal.vue'; // Importujte komponentu za obroke
import EditMeal from '../views/EditMeal.vue'; // fas

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  
  {
    path: '/myworkout',
    name: 'MojiTreninzi',
    component: MojiTreninzi,
    meta: { requiresAuth: true } // Ako imate autentifikaciju
  },
  {
    path: '/workouts',
    name: 'WorkoutsView',
    component: WorkoutsView
  },
  {
    path: '/add-workout',
    name: 'AddWorkout',
    component: AddWorkout,
  },
  {
    path: '/mymeals',
    name: 'MojiObroci',
    component: MojiObroci,
    meta: { requiresAuth: true } // Ako imate autentifikaciju
  },
  {
    path: '/meals/edit/:id',
    name: 'EditMeal',
    component: EditMeal,
    props: true,
    meta: { requiresAuth: true } // Ako imate autentifikaciju
  },
  {
    path: '/meal',
    name: 'MealView',
    component: MealView
  },
  {
    path: '/edit-workout/:id',
    name: 'EditWorkout',
    component: EditWorkout
  },
  {
    path: '/delete-workout/:id',
    name: 'DeleteWorkout',
    component: DeleteWorkout
  },
  {
    path: '/meals',
    name: 'Meals',
    component: MealsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/TreneriView',
    name: 'Treneri',
    component: () => import('../views/TreneriView.vue')
  },
  {
    path: '/LoginV',
    name: 'Login',
    component: () => import('../views/LoginV.vue')
  },
  {
    path: '/update-profile',
    name: 'UpdateProfile',
    component: UpdateProfile
  },
  {
    path: '/MealprepView',
    name: 'Mealprep',
    component: () => import('../views/MealprepView.vue')
  },
  {
    path: '/SignupV',
    name: 'Signup',
    component: () => import('../views/SignupV.vue')
  },
  
  {
    path: '/register',
    name: 'Register',
    component: UserRegister
  },
    {
      path: '/trainers',
      name: 'Trainers',
      component: TrainersView
    },
  
  {
    path: '/login',
    name: 'Login',
    component: UserLogin
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { requiresAuth: true }
  }

  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
