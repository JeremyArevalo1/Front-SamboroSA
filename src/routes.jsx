import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
import { PageUser } from "./pages/PageUsers/PageUser";

const routes = [
    { path: "/", element: <Login /> },
    { path: "/register-user", element: <Register /> },
    { path: "/principalPage", element: <DashboardPage /> },
    { path: "/userPage", element: <PageUser /> },
];
  
export default routes