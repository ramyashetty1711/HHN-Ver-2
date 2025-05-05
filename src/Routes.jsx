import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Feedback from "./components/Feedback/Feedback";

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
    {path:"/feedback",component:<Feedback/>}
  ];

  return (
    <Router>
      {/* Outer container with full height flex column */}
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main content takes remaining space */}
        <main className="flex-1 bg-white overflow-hidden">
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-full">
                <SpinnerCircularFixed size={40} thic  kness={180} speed={120} color="skyblue" />
              </div>
            }
          >
            <Routes>
              {routes.map((val, idx) => (
                <Route key={idx} path={val.path} element={val.component} />
              ))}
            </Routes>
          </Suspense>
        </main>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </Router>
  );
}
