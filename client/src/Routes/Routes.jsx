import { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Preloader from "../Components/Preloader";

const StartPage = lazy(() => import("../Pages/StartPage"));
const AllGames = lazy(() => import("../Pages/AllGames"));
const AuthPage = lazy(() => import("../Pages/AuthPage"));
const LoginPage = lazy(() => import("../Pages/LoginPage"));
const RestorePassword = lazy(() => import("../Pages/RestorePassword"));
const NewPassword = lazy(() => import("../Pages/NewPassword"));
const Friends = lazy(() => import("../Pages/Friends"));
const People = lazy(() => import("../Pages/People"));
const Winners = lazy(() => import("../Pages/Winners"));
const LimitGame = lazy(() => import("../Pages/LimitGame"));
const OneWeek = lazy(() => import("../Pages/OneWeek"));
const OneMonth = lazy(() => import("../Pages/OneMonth"));
const OneYear = lazy(() => import("../Pages/OneYear"));
const Admin = lazy(() => import("../Pages/Admin"));

const Routes = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <Switch>
        <Route exact path="/" component={StartPage} />
        <Route path="/allgames" component={AllGames} />
        <Route path="/register" component={AuthPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/new-password/:token" component={NewPassword} />
        <Route path="/restore-password" component={RestorePassword} />
        <Route path="/friends" component={Friends} />
        <Route path="/people" component={People} />
        <Route path="/winners" component={Winners} />
        <Route path="/admin" component={Admin} />
        <Route path="/limitGame" component={LimitGame} />
        <Route path="/oneWeek" component={OneWeek} />
        <Route path="/oneMonth" component={OneMonth} />
        <Route path="/oneYear" component={OneYear} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
};

export default Routes;
