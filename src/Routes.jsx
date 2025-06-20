import React, { lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SplashPage from "./components/Splash/SplashPage";
import Navbar from "./components/Common/Navbar";
import Footer from "./components/Common/Footer";
import Home from "./components/Home/Home";
import { TicketStatus } from "./components/Support/Ticket";
import TutorialDocuments from "./components/More/Tutorial/TutorialDocuments";
import NotFound from "./components/Common/NotFound";

const BackGround = lazy(() => import("./components/BackGround/BackGround"));
const Necessity = lazy(() => import("./components/Necessity/Necessity"));
const Development = lazy(() => import("./components/Development/Development"));
const Trials = lazy(() => import("./components/Trials/Trials"));
const Feature = lazy(() => import("./components/Feature/Feature"));
const Procurment = lazy(() => import("./components/Procurment/Procurment"));
const NavIC = lazy(() => import("./components/NaVIC/NaVIC"));
const Elena = lazy(() => import("./components/Elena/Elena"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const Help = lazy(() => import("./components/Help/Help"));
const About = lazy(() => import("./components/About/About"));
const Login = lazy(() => import("./components/Login/Login"));
const Wrapper = lazy(() => import("./Wrapper"));
const Feedback = lazy(() => import("./components/Support/Feedback"));
const Ticket = lazy(() => import("./components/Support/Ticket"));
const Cert = lazy(() => import("./components/CofHHN/Cert"));
const More = lazy(() => import("./components/More/More"));

export default function AppRoutes() {
  const routes = [
    { path: "/", component: <About /> },
    { path: "/background", component: <BackGround /> },
    { path: "/necessity", component: <Necessity /> },
    { path: "/development", component: <Development /> },
    { path: "/trials", component: <Trials /> },
    { path: "/features", component: <Feature /> },
    { path: "/procurement", component: <Procurment /> },
    { path: "/NavIC", component: <NavIC /> },
    { path: "/elena", component: <Elena /> },
    { path: "/contact", component: <Contact /> },
    { path: "/faq", component: <Help /> },
    { path: "/about", component: <About /> },
    { path: "/login", component: <Login /> },
    { path: "/certificationofhhn", component: <Cert /> },
    // { path: "/feedback", component: <Feedback /> },
    // { path: "/ticket", component: <Ticket /> },
  ];

  return (
    <Router>
      <Routes>
        <Route element={<Wrapper />}>
          {routes.map((val, idx) => (
            <Route key={idx} path={val.path} element={val.component} />
          ))}
          <Route
            path="/support"
            element={
              <PrivateRoute>
                <Ticket />
              </PrivateRoute>
            }
          />
          <Route
            path="/tickets"
            element={
              <PrivateRoute>
                <TicketStatus />
              </PrivateRoute>
            }
          />
          <Route
            path="/tutorials"
            element={
              <PrivateRoute>
                <TutorialDocuments />
              </PrivateRoute>
            }
          />
          <Route
            path="/downloads"
            element={
              <PrivateRoute>
                <More />
              </PrivateRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <PrivateRoute>
                <Feedback />
              </PrivateRoute>
            }
          />
          <Route
            path="/more"
            element={
              <PrivateRoute>
                <More />
              </PrivateRoute>
            }
          />
        </Route>

        {/* 404 Not Found route - must be outside the Wrapper */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

// Private Route wrapper
const PrivateRoute = ({ children }) => {
  const user = sessionStorage.getItem("user");
  const isAuthenticated = user !== undefined && user !== null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
