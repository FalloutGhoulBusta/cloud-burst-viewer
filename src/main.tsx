
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add error boundary to catch and log rendering errors
try {
  console.log('Initializing app...');
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error("Root element not found!");
  }
  
  console.log('Creating root...');
  const root = createRoot(rootElement);
  
  console.log('Rendering app...');
  root.render(<App />);
  
  console.log('App rendered successfully');
} catch (error) {
  console.error('Error rendering the app:', error);
}
