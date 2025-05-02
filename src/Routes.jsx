import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SpinnerCircularFixed } from "spinners-react";
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

export default function AppRoutes() {
  const routes = [
    { path: "/", element: <About/> },
    { path: "/background", element: <BackGround /> },
    { path: "/necessity", element: <Necessity /> },
    { path: "/development", element: <Development /> },
    { path: "/trials", element: <Trials /> },
    { path: "/features", element: <Feature /> },
    { path: "/procurment", element: <Procurment /> },
    { path: "/NavIC", element: <NavIC /> },
    { path: "/elena", element: <Elena /> },
    { path: "/contact", element: <Contact /> },
    { path: "/help", element: <Help /> },
  ];

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar at top center */}
        <header className="">
          <Navbar />
        </header>

        {/* Main content takes remaining height */}
        <main className="flex-1 flex justify-center items-center p-4">
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-full">
                <SpinnerCircularFixed
                  speed={200}
                  thickness={200}
                  size={40}
                  color="skyblue"
                />
              </div>
            }
          >
            <Routes>
              {routes.map((route, i) => (
                <Route key={i} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Suspense>
        </main>

        {/* Footer fixed at bottom */}
        <footer className="">
          <Footer />
        </footer>
      </div>
    </Router>
  );
}
