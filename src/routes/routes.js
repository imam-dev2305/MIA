import DashboardLayout from '../layout/DashboardLayout.vue'
import LandingLayout from '../layout/Landing'
import LoginLayout from '../layout/Login'
import RegisterLayout from '../layout/Register'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import JournalAccount from '../pages/JournalAccount'
import Transaction from "../pages/Transaction";
import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Notifications from 'src/pages/Notifications.vue'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingLayout,
  },
  {
    path: '/login',
    component: LoginLayout,
  },
  {
    path: '/register',
    component: RegisterLayout,
  },
  {
    path: '/main',
    component: DashboardLayout,
    redirect: '/main/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview,
        meta: {requiresAuth: true},
      },
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
