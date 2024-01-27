import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import StoriesList from './pages/StoriesList';
import Story from './pages/Story';
import { QueryClient, QueryClientProvider } from 'react-query';

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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
