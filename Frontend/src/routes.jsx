import App from "./App";
import ErrorPage from "./pages/errorPage/errorPage";
import HomeScreen from "./pages/home/home";
import AuthCheck from "./pages/authCheck/authCheck";
import LoginPage from "./pages/login/login";
import SignupPage from "./pages/signup/signup";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <AuthCheck /> },
      {
        path: "home",
        element: <HomeScreen />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
    ],
  },
];

export default routes;
