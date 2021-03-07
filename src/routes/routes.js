import DashboardLayout from '../layout/DashboardLayout.vue'
import LandingLayout from '../layout/Landing'
import LoginLayout from '../layout/Login'
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
    component: LandingLayout,
  },
  {
    path: '/login',
    component: LoginLayout,
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
      {
        path: 'kategori-transaksi',
        name: 'Kategori Transaksi',
        component: JournalAccount,
        meta: {requiresAuth: true},
      },
      {
        path: 'transaksi',
        name: 'Transaksi',
        component: Transaction,
        meta: {requiresAuth: true},
      },
      {
        path: 'asset-liabilitas',
        name: 'Asset Liabilitas',
        component: Typography,
        meta: {requiresAuth: true},
      },
      {
        path: 'pemasukan',
        name: 'Pemasukan',
        component: Icons,
        meta: {requiresAuth: true},
      },
      {
        path: 'perencanaan-keuangan',
        name: 'Perencanaan Keuangan',
        component: Notifications,
        meta: {requiresAuth: true},
      }
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
