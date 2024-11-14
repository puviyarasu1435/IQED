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
  GamePage,
  MatchLobby,
  QuizPage,
} from "../Pages";
import UserLayout from "../Pages/Layout/UserLayout";
import MatchLayout from "../Pages/Layout/MatchLayout";
import { OnLoadLobby } from "../Pages/GamePage/MatchPage/MatchLobby";
import QuizLayout from "../Pages/Layout/QuizLayout";


export const Routers = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="auth" element={<AuthPage />} />
      <Route element={<AuthLayout />}>
        <Route element={<UserLayout />}>
          <Route path="explore" element={<ExplorePage />} />
          <Route path="missions" element={<MissionPage />} />
          <Route path="game" element={<GamePage />} />
        </Route>
        <Route path="quiz" element={<Outlet />}>
          <Route path=":id" element={<QuizLayout />}>
            <Route index element={<QuizPage /> }   />
            <Route path="result" element={<></>} />
          </Route>
        </Route>
      </Route>
      <Route path="match" element={<MatchLayout />}>
        <Route index element={<MatchLobby />} loader={OnLoadLobby}/>
        <Route path=":code"  />
      </Route>
    </Route>
  )
);  
