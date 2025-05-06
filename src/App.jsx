import "./App.css";
import AppRoutes from "./Routes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { store } from "./redux/Store";
import { Provider } from "react-redux";
import { ToastProvider } from "./components/Toast/ToastContext";

function App() {
  return (
    <>
      <ToastProvider>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </ToastProvider>
    </>
  );
}

export default App;
