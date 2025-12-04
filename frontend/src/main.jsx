import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

// Add error boundary for debugging
console.log('Main.jsx loaded');
console.log('Environment variables:', import.meta.env);
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Make sure there is a div with id="root" in your HTML.');
}

const root = createRoot(rootElement);

console.log('About to render App component');

try {
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
  console.log('App component rendered successfully');
} catch (error) {
  console.error('Error rendering App:', error);
  root.render(
    <div style={{ padding: '20px', color: 'red' }}>
      <h1>Error Loading App</h1>
      <p>{error.message}</p>
      <pre>{error.stack}</pre>
    </div>
  );
}
