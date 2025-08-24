import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import GlobalBackdrop from "./components/GlobalBackdrop";
import AuthListener from "./components/AuthListener";
import "./App.css";
import RouterConfig from "./config/RouterConfig";

function App() {
    return (
        <Provider store={store}>
            <AuthListener>
                <ToastContainer position="top-right" autoClose={2000} />
                <GlobalBackdrop />
                <RouterConfig />
            </AuthListener>
        </Provider>
    );
}

export default App;
