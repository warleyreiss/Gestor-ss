
import { AppRouter } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import '/node_modules/primeflex/primeflex.css'
export const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};
