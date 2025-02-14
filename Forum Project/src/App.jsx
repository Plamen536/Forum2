import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Home from "./view/Home/Home";
import NotFound from "./view/NotFound/NotFound";
import "./App.css";
import Header from "./components/Header/Header";
import { AppContext } from "./components/store/app.context";

function App() {
  const [appState, setAppState] = useState({
    user: null,
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
    <BrowserRouter>
      <AppContext.Provider value={{ ...appState, setAppState }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register></Register>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
