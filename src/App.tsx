import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import StoriesList from './pages/StoriesList';
import Story from './pages/Story';

const router = createBrowserRouter([
  {
    path: '/',
    element: <StoriesList />,
  },
  {
    path: '/:id',
    element: <Story />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
