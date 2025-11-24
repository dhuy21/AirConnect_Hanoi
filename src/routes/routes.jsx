import routes from '../config/routes';

//pages
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import FeedbackPage from '../pages/FeedbackPage';
import MapPage from '../pages/MapPage';
import Resources from '../pages/Resources';

//dashboard pages
import SchoolDashboard from '../pages/SchoolDashboard';
import UserDashboard from '../pages/UserDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import NewSubmission from '../pages/NewSubmission';


//Public routes
const publicRoutes = [
  { path: routes.home, component: HomePage, layout: 'default' }, // Uses DefaultLayout (Header + Footer)
  { path: routes.login, component: Login, layout: 'default' }, // Fullscreen page without layout
  { path: routes.register, component: Register, layout: 'default' }, // Fullscreen page without layout
  { path: routes.feedback, component: FeedbackPage, layout: 'default' }, // Uses DefaultLayout
  { path: routes.map, component: MapPage, layout: 'default' }, // Uses DefaultLayout
  { path: routes.resources, component: Resources, layout: 'default' }, // Uses DefaultLayout
];

//Private routes (all use DashboardLayout)
const privateRoutes = [
  { path: routes.adminDashboard, component: AdminDashboard, layout: 'dashboard' },
  { path: routes.userDashboard, component: UserDashboard, layout: 'dashboard' },
  { path: routes.schoolDashboard, component: SchoolDashboard, layout: 'dashboard' },
  { path: routes.newSubmission, component: NewSubmission, layout: 'dashboard' },
];

export { publicRoutes, privateRoutes };
