import "./styles/App.scss";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Router from "./Router";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router />
      </Provider>
    </>
  );
}

export default App;
