
import { RouterProvider } from 'react-router-dom';
import './index.css'
import { appRouter } from './routes';

function App() {
  return (
    <RouterProvider
      router={appRouter}
      fallbackElement={<p>Loading</p>}
    />
  );
}

export default App;
