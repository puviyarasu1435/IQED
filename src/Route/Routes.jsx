import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";

import RootLayout from "../Pages/Layout/RootLayout";
import AuthLayout from "../Pages/Layout/AuthLayout";
import {
  LandingPage,
  AuthPage,
  ExplorePage,
  MissionPage,
  MatchPage,
  MatchLobby,
} from "../Pages";
import UserLayout from "../Pages/Layout/UserLayout";

export const Routers = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="auth" element={<AuthPage />} />
      <Route element={<AuthLayout />}>
        <Route element={<UserLayout />}>
          <Route path="explore" element={<ExplorePage />} />
          <Route path="missions" element={<MissionPage />} />
          <Route path="game" element={<MatchPage />}></Route>
        </Route>
      </Route>
      <Route path="match" element={<Outlet />}>
        <Route index element={<MatchLobby />} />
        <Route path=":pin" element={<MatchLobby />} />
      </Route>
    </Route>
  )
);
