import routes from '../config/routes';

//pages
import HomePage from '../pages/HomePage';
import AuthPage from '../pages/AuthPage';
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
  { path: routes.home, component: HomePage, layout: 'default' },
  { path: routes.login, component: AuthPage, layout: 'default' },
  { path: routes.register, component: AuthPage, layout: 'default' },
  { path: routes.feedback, component: FeedbackPage, layout: 'default' },
  { path: routes.map, component: MapPage, layout: 'default' },
  { path: routes.resources, component: Resources, layout: 'default' },
];

//Private routes 
const privateRoutes = [
  { path: routes.adminDashboard, component: AdminDashboard, layout: 'AdminDashboardLayout' },
  { path: routes.userDashboard, component: UserDashboard, layout: 'UserDashboardLayout' },
  { path: routes.schoolDashboard, component: SchoolDashboard, layout: 'SchoolDashboardLayout' },
  { path: routes.newSubmission, component: NewSubmission, layout: 'SchoolDashboardLayout' },
];

export { publicRoutes, privateRoutes };
