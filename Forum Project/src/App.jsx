import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import Home from './view/Home/Home';
import NotFound from './view/NotFound/NotFound';
import Login from './components/Login/Login';
import './App.css';
import Header from './components/Header/Header';
import { AppContext } from './components/store/app.context';
import TrendingView from './components/TrendingView/TrendingView';
import PostView from './components/PostView/PostView';
import UploadView from './components/Upload/Upload';

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
          <Route path="/" element={<TrendingView />} />
          <Route path="/post" element={<PostView />} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/register" element={<Register></Register>} />
          <Route path="/upload" element={<UploadView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
