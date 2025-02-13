import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [appState, setAppState] = useState({
    user,
    userData: null,
  });

  const onLogout = () => {
    logoutUser().then(() => {
      setAppState({
        user: null,
        userData: null,
      });
    });
  };

  return (
    <AppContext.Provider value={{ ...appState, setContext: setAppState }}>
      <BrowserRouter>
        <div className="App">
          <Link to="/">Home</Link> &nbsp;
          {user === null && <Link to="/register">Register</Link>} &nbsp;
          {user === null && <Link to="/login">Login</Link>} &nbsp;
          {user !== null && (
            <Link to="/" onClick={onLogout}>
              Logout
            </Link>
          )}
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
