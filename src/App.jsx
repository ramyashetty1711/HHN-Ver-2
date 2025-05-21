import "./App.css";
import AppRoutes from "./Routes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { store } from "./redux/Store";
import { Provider } from "react-redux";
import { ToastProvider } from "./components/Toast/ToastContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryProvider } from "./query/QueryProvider";
import "leaflet/dist/leaflet.css";
// import LocationLogger from "./GetLocation";
import { useEffect } from "react";

function App() {
  return (
    <>
      <QueryProvider>
        <ToastProvider>
          <Provider store={store}>
            <AppRoutes />
          </Provider>
        </ToastProvider>
      </QueryProvider>
      {/* <LocationLogger /> */}
    </>
  );
}

export default App;
