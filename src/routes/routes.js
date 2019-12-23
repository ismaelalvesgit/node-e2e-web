import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

const Catalog = () => import(/* webpackChunkName: "catalog" */ 'src/components/Dashboard/Views/Dashboard/Catalog.vue')
const Movies = () => import(/* webpackChunkName: "catalog" */ 'src/components/Dashboard/Views/Dashboard/Movies.vue')
const AddMovie = () => import('src/components/Dashboard/Views/Dashboard/Catalog/MovieAdd.vue')
const EditMovie = () => import('src/components/Dashboard/Views/Dashboard/Catalog/MovieEdit.vue')

import Login from 'src/components/Dashboard/Views/Pages/Login.vue'

let loginPage = {
  path: '/login',
  name: 'Login',
  component: Login,
  meta: { auth: false }
}

const routes = [
  {
    path: '/movie',
    component: DashboardLayout,
    redirect: '/movie/list',
    meta: { auth: true },
    children: [
      {
        path: 'list',
        name: 'Movie List',
        component: Movies
      },
      {
        path: 'add',
        name: 'Add Movie',
        component: AddMovie
      },
      {
        path: 'edit/:id',
        name: 'Edit Movie',
        component: EditMovie
      }
    ]
  },
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/catalog',
    meta: { auth: true },
    children: [
      {
        path: 'catalog',
        name: 'Catalog',
        component: Catalog
      }
    ]
  },
  loginPage,
  {path: '*', component: NotFound}
];

export default routes
