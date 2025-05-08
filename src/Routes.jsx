import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SpinnerCircularFixed } from "spinners-react";
import SplashPage from "./components/Splash/SplashPage";
import Navbar from "./components/Common/Navbar";
import Footer from "./components/Common/Footer";
import Home from "./components/Home/Home";
import BackGround from "./components/BackGround/BackGround";
import Necessity from "./components/Necessity/Necessity";
import Development from "./components/Development/Development";
import Trials from "./components/Trials/Trials";
import Feature from "./components/Feature/Feature";
import Procurment from "./components/Procurment/Procurment";
import NavIC from "./components/NaVIC/NaVIC";
import Elena from "./components/Elena/Elena";
import Contact from "./components/Contact/Contact";
import Help from "./components/Help/Help";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import Wrapper from "./Wrapper";
import Feedback from "./components/Support/Feedback";
import Ticket from "./components/Support/Ticket";
import Cert from './components/CofHHN/Cert'
import More from "./components/More/More";

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
    { path: "/certificationofhhn", component: <Cert/> },
    // { path: "/feedback", component: <Feedback /> },
    // { path: "/ticket", component: <Ticket /> },
  ];

  return (
    <Router>
      {/* <Suspense
        fallback={
          <div className="flex justify-center items-center h-full">
            <SpinnerCircularFixed
              size={40}
              thickness={180}
              speed={120}
              color="skyblue"
            />
          </div>
        }
      > */}
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
                <More/>
              </PrivateRoute>
            }
          />
        </Route>
        

        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
      {/* </Suspense> */}
    </Router>
  );
}

const PrivateRoute = ({ children }) => {
  const user = sessionStorage.getItem("user");

  
  const isAuthenticated = user !== undefined && user !== null;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
