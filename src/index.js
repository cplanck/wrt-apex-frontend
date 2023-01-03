import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ApexApp from './ApexApp';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import 'bootstrap/dist/css/bootstrap.min.css';

serviceWorkerRegistration.unregister();
const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ApexApp />
    </QueryClientProvider>
  </React.StrictMode>
);
reportWebVitals();
