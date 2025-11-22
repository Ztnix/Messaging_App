import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import HomeScreen from "../../pages/home/home";
import LoadingSpinner from "../../components/ui/loadingSpinner";

export default function AuthCheck() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner></LoadingSpinner>;
  if (!user) return <Navigate to="/login" replace />;
  return <HomeScreen />;
}
