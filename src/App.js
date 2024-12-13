
import { AppRouter } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import '/node_modules/primeflex/primeflex.css'
import 'primeicons/primeicons.css';
import './css/styles.css'
import './css/formLogin.css'
export const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};
