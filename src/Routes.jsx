import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SplashPage from "./components/Splash/SplashPage";
import { SpinnerCircularFixed } from "spinners-react";
import Development from "./components/Development/Development";
import Navbar from "./components/Common/Navbar";
import About from "./components/About/About";
import Trials from "./components/Trials/Trials";
import Feature from "./components/Feature/Feature";
import NavIC from "./components/NaVIC/NaVIC";

export default function AppRoutes() {
  const RouteElements = [
    {
      path: "/development",
      component: <Development />,
    },
    {
      path: "/trials",
      component: <Trials />,
    },
    {
      path: "/features",
      component: <Feature />,
    },
    {
      path: "/NavIC",
      component: <NavIC />,
    },
  ];
  const SuspenseFallback = (Component) => (
    <Suspense
      fallback={
        <div className=" tw-min-h-[25vh] d-flex justify-content-center align-items-center">
          {" "}
          <Spinner
            style={{
              height: "1.5em",
              width: "1.5em",
              color: "#745236",
            }}
            className="p-1"
          />
        </div>
      }
    >
      <Component />
    </Suspense>
  );

  return (
    <>
      <Router>
        <Routes>
          <Route>
            <Route element={<Navbar />}>
              <Route
                path="/"
                element={
                  <Suspense
                    fallback={
                      <div className=" tw-min-h-[100vh] d-flex justify-content-center align-items-center">
                        {" "}
                        <SpinnerCircularFixed
                          speed={200}
                          thickness={200}
                          size={20}
                          color="sky"
                          className="p-1"
                        />
                      </div>
                    }
                  >
                    <About />
                  </Suspense>
                }
              />

              {RouteElements.map((val) => (
                <Route element={val.component} path={val.path} />
              ))}
            </Route>
          </Route>
        </Routes>
      </Router>

      {/* <CustomToast
        icon={toastData.icon}
        color={toastData.color}
        header={toastData.header}
        body={toastData.body}
        show={toastData.show}
        toggleShow={hideToast}
      /> */}
    </>
  );
}

const PrivateRoute = ({ path, isAuthenticated, component: Component }) => {
  return (
    <Route
      path={path}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          (window.location.href = "/")
        )
      }
    />
  );
};
