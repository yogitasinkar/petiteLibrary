
import { RouterProvider } from 'react-router-dom';
import './index.css'
import { appRouter } from './routes';
import { QueryClientProvider } from '@tanstack/react-query';
import { Spin } from 'antd';
import { queryClient } from './utils/queryClient';
import { Toaster as Notification } from 'react-hot-toast';


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Notification/>
      <RouterProvider
        router={appRouter}
        fallbackElement={<Spin/>}
      />
    </QueryClientProvider>
  );
}

export default App;
