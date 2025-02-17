import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Register from './components/Register/Register';
import Home from './view/Home/Home';
import NotFound from './view/NotFound/NotFound';
import Login from './components/Login/Login';
import './App.css';
import { AppContext } from './components/store/app.context';
import Dashboard from './components/Dashboard/Dashboard';
import PostView from './components/PostView/PostView';
import UploadView from './components/Upload/Upload';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config';
import { getUserData } from './services/users.service';
import ProfileView from './components/ProfileLayout/ProfileView/ProfileView';
import ProfileLayout from './components/ProfileLayout/ProfileLayout';
import MainLayout from './components/MainLayout/MainLayout';

function App() {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });

  const [user, loading, error] = useAuthState(auth);

  if (appState.user !== user) {
    setAppState({
      ...appState,
      user,
    });
  }

  useEffect(() => {
    if (!user) return;

    getUserData(appState.user.uid)
      .then((data) => {
        const userData = data[Object.keys(data)[0]];
        setAppState({
          ...appState,
          userData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <BrowserRouter>
        <AppContext.Provider value={{ ...appState, setAppState }}>
          <Routes>
            {/* Routes with main layout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/post" element={<PostView />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/upload" element={<UploadView />} />
            </Route>
            {/* Profile section with its own layout */}
            <Route element={<ProfileLayout />}>
              <Route path="/your-profile" element={<ProfileView />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
