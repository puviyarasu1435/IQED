import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";



import RootLayout from "../Components/Layout/RootLayout";
import {
  LandingPage,
  AuthPage
} from "../pages";
import BasicForm from "../Pages/Test/BasicForm";





export const Routers = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="Auth" element={<AuthPage />} />
      <Route path="Test" element={<BasicForm />} />
    </Route>
  )
);
