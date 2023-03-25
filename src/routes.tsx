import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Document = React.lazy(() => import('./components/document/document'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/document/show', name: 'Document', element: Document },
];

export default routes;
