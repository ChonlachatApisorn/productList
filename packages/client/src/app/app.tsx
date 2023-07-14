import { Router } from './routes';
import '../index.css';
import Navbar from './components/navbar';
import AuthProvider from './contexts/auth.context';

export function App() {
  return (
    <AuthProvider>
      <Navbar>
        <Router />
      </Navbar>
    </AuthProvider>
  );
}

export default App;
